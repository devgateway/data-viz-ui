# wp-react-lib `/v2`

A pure TypeScript, SSR-friendly rewrite of `wp-react-lib`, published from the same package under a separate subpath so it can be adopted without touching anything on `wp-react-lib`'s existing (v1) API surface.

```ts
import { createWordPressClient, WordPressProvider, usePosts } from '@devgateway/wp-react-lib/v2';
```

## Why a separate API instead of a v1 upgrade

v1 is built on `react-redux` + `immutable` (a global store your app has to configure) and renders `semantic-ui-react` loading/error UI directly inside its providers. Neither survives a move to server-side rendering cleanly: a module-level Redux store can't be request-scoped, and `semantic-ui-react` is unmaintained. v2 has no dependency on either - it's plain React Context + hooks, and every hook returns state (`{ data, loading, error }`) for *you* to render, rather than rendering UI itself.

## Quick start

```tsx
import { WordPressProvider, usePosts, Post } from '@devgateway/wp-react-lib/v2';

function App() {
  return (
    <WordPressProvider config={{ baseUrl: 'https://example.com/wp' }}>
      <BlogIndex />
    </WordPressProvider>
  );
}

function BlogIndex() {
  const { data, loading, error } = usePosts({ perPage: 10 });

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;
  return <Post posts={data} />;
}
```

## The client

`createWordPressClient(config)` builds a typed client covering the same endpoints as v1's `api/index.ts` (posts, pages, media, settings, menu, categories, taxonomy, search, year-range) - but as bound methods on an instance instead of free functions that each take their own `apiBaseUrl`.

```ts
const client = createWordPressClient({
  baseUrl: 'https://example.com/wp', // or a relative path, see below
  locale: 'en',
  timeout: 10_000,                    // ms, enforced via AbortController
  headers: { 'X-Custom-Header': 'foobar' },
  fetch: myFetchImplementation,       // defaults to global fetch
});

const { data, meta } = await client.getPosts({ slug: 'hello-world' });
```

No config is ever read from an environment variable (`import.meta.env`/`process.env`, as v1 does) - everything arrives through this call, which is what makes the client usable identically in the browser, in a Node SSR process, or in a serverless function.

### `baseUrl`: absolute vs. relative, and how SSR is handled

- **Absolute** (`https://example.com/wp`) works everywhere - browser, server, anywhere.
- **Relative** (`/wp`, e.g. behind a reverse proxy) works as-is in the browser, where it resolves against the page's own origin. On the server there is no such thing - `fetch` under Node/undici cannot resolve a relative URL at all - so a relative `baseUrl` on the server needs one more piece of information:

```ts
// In an SSR loader, derive the origin from the incoming request:
const client = createWordPressClient({
  baseUrl: '/wp',
  origin: new URL(request.url).origin,
});

// Or point SSR requests at an internal address, bypassing the public proxy:
const client = createWordPressClient({
  baseUrl: '/wp',
  origin: 'http://wordpress:8080',
});
```

Without `origin`, a relative `baseUrl` throws a clear `WPConfigError` the moment something actually tries to fetch with no `window` present - never a cryptic `fetch` parse failure. Building the client itself never throws, even with a relative `baseUrl` and no `origin` - only a request attempt does, so it's safe to construct a client during SSR for a component that never ends up fetching.

## The Provider

`WordPressProvider` works identically during SSR and in the browser. Pass either:

```tsx
<WordPressProvider config={{ baseUrl: 'https://example.com/wp' }}>
```

which builds the client for you, or:

```tsx
<WordPressProvider client={myClient}>
```

if you already built one yourself - for example because you used it to prefetch data in an SSR loader before rendering, and want the same instance available to hooks further down the tree via `useWordPress()`/`useWPClient()`.

Either way, the client is created once per `WordPressProvider` instance (a lazy `useState` initializer, never a module-level singleton) - so on the server, a fresh client exists per request, and there's no risk of one request's config or in-flight state leaking into another's.

## Data hooks

Every domain hook returns the same shape: `{ data, meta, loading, error, refetch }`.

| Hook | Wraps | `data` type |
|---|---|---|
| `usePosts(params)` | `client.getPosts` | `Post[]` |
| `usePages(params)` | `client.getPages` | `Post[]` |
| `useMedia({ slug, locale })` | `client.getMedia` | `Media` |
| `useMenu<T>({ name, locale })` | `client.getMenu` | `T` (plugin-specific; type it yourself) |
| `useCategories(params)` | `client.getCategories` | `WPTerm[]` |
| `useTaxonomy<T>({ name, locale })` | `client.getTaxonomy` | `T` (defaults to `WPTerm[]`) |
| `useSearch(params)` | `client.search` | `SearchResult[]` |
| `useSettings({ locale, changesetUuid })` | `client.getSettings` | `DgSettings` |

Each fetches on mount and refetches whenever its params change. Pass `initialData` (and optionally `initialMeta`) to hydrate from data you already fetched server-side (e.g. in a route loader) - doing so skips that first client-side fetch entirely, so there's no loading flash after hydration:

```tsx
function BlogIndex({ initialPosts }: { initialPosts: Post[] }) {
  const { data, loading } = usePosts({ perPage: 10, initialData: initialPosts });
  // `loading` is already `false` on the very first render.
  return <Post posts={data} />;
}
```

`refetch()` triggers another fetch on demand (e.g. a "retry" button), independent of whether params changed.

## Rendering content

`templates/` (`Post`, `Page`, `Category`, `Taxonomy`) and `template-parts/` (`Content`, `PostTitle`, `PostDate`, `PostIntro`, `PostContent`, `PostIcon`, `PostLabel`) are plain, typed, presentational components - they take already-fetched data as props and render it; they never fetch anything themselves. This is the same division of labor as v1's templates (which already took `post`/`posts` as props), just without the `Provider`/`Consumer`/`Context`-per-domain machinery in between - wire a hook directly to a template:

```tsx
const { data } = usePosts({ slug: 'hello-world' });
return <Post posts={data} />;
```

`Content` (and the `PostTitle`/`PostDate`/`PostIntro`/`PostContent` wrappers around it) renders `post.title.rendered`/`content.rendered`/etc. via `dangerouslySetInnerHTML`, after running the same link-rewriting and WP\_Multilang pattern-handling utilities v1 used (`src/v2/util/content.ts`) - this is pure string logic with no DOM dependency, so it's already safe under SSR as-is.

## Embedding custom components inside WP content

WordPress-authored content can contain placeholders (`<div class="viz-component" data-component="MyWidget" ...>`) that should be replaced with real, interactive React components once the page reaches the browser. `Content` wraps its output in `EmbeddedGateway`, which walks the DOM for those placeholders and mounts the matching component - client-only, since it needs the DOM that SSR already produced (a `useEffect`, so it never runs server-side; placeholders simply render as static markup during SSR).

Register components with `EmbedProvider`, somewhere above your content:

```tsx
<EmbedProvider registry={{ MyWidget }}>
  <WordPressProvider config={{ baseUrl: '...' }}>
    <App />
  </WordPressProvider>
</EmbedProvider>
```

Because each embedded component mounts into a *separate* React root (the placeholder lives inside raw HTML from `dangerouslySetInnerHTML`, not inside the normal JSX tree), it inherits **no context** from the surrounding app - not `WordPressProvider`, not anything else. If your embedded components need context of their own (their own i18n setup, a redux store, `WordPressProvider` so they can call `useSettings()`/`usePosts()`), re-establish it via `wrapper`:

```tsx
<EmbedProvider
  registry={{ MyWidget }}
  wrapper={(children) => (
    <WordPressProvider client={client}>{children}</WordPressProvider>
  )}
>
```

v2 takes no opinion on internationalization - `wrapper` is where you'd plug in your own i18n provider if your embedded components need one. If WordPress already resolves content into a given locale via the `locale`/`lang` param passed to the client, there may be nothing further to do.

## Errors

- `WPConfigError` - invalid configuration (e.g. a relative `baseUrl` with no `origin` during SSR, or a `WordPressProvider` given neither `config` nor `client`).
- `WPApiError` - a non-2xx response; carries `status`, `url`, and the parsed response `body` when available.
- `WPTimeoutError` (extends `WPApiError`) - the request exceeded `config.timeout`.

## What's not here yet

- Consumer/Provider-per-domain components (`PostConsumer`, `PageProvider`, ...) - superseded by the hooks above; v1's own `PostConsumer` already documented itself as deprecated in favor of reading context directly.
- `EmbeddedGateway`'s registry mechanism is new in v2 and not a drop-in replacement for v1's `EmbeddedGateway` (which wired `react-redux`/`react-intl` directly) - see [Embedding custom components](#embedding-custom-components-inside-wp-content) above.

See the [package README](../../README.md) for v1's (current, unaffected) API.
