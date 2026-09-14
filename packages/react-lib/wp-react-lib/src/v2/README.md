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

## Caching adapters: TanStack Query and RTK Query

The hooks in [Data hooks](#data-hooks) each manage their own fetch state independently - two components calling `usePosts({ slug: 'x' })` fetch twice, with no shared cache. Two optional adapters add a real cache with cross-component request dedup, each in its own subpath so its dependency is never forced on you: `@devgateway/wp-react-lib/v2/query` (TanStack Query) and `@devgateway/wp-react-lib/v2/rtk-query` (RTK Query, for apps that already use Redux). Pick **one** adapter (or neither) for a given piece of data - don't mix the plain hooks, the TanStack adapter, and the RTK adapter for the same endpoint in the same app.

Both are demonstrated below with a React Router v7 (framework mode) loader, since that's the SSR pattern this package itself is tested against - but neither adapter depends on React Router; the same shapes work with any loader/`getServerSideProps`-style data function.

### TanStack Query adapter

Install `@tanstack/react-query` (an optional peer dependency of this package) to use it.

```tsx
import { usePosts } from '@devgateway/wp-react-lib/v2/query';

function BlogIndex() {
  const { data, isPending, error } = usePosts({ perPage: 10 });
  if (isPending) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;
  return <Post posts={data.data} />;
}
```

Every hook (`usePosts`, `usePages`, `useMedia`, `useMenu`, `useCategories`, `useTaxonomy`, `useSearch`, `useSettings`) returns TanStack's native `UseQueryResult` (`data`, `isPending`, `isFetching`, `error`, `refetch`, ...), not this package's own `{ data, meta, loading, error, refetch }` shape - `data` is the full `WPResponse<T>` (`{ data, meta }`), so a post list is `data.data`. Each hook has a matching `xQueryOptions(client, params)` factory (e.g. `postsQueryOptions`) - the same object `useQuery` builds internally, exported so a loader can prefetch with the *exact* query key and fetcher the hook uses. `wpQueryKeys` is the shared key registry (`wpQueryKeys.all` invalidates everything this adapter fetched; `wpQueryKeys.posts` invalidates every `usePosts` query regardless of params).

**Configuration - a per-request-safe `QueryClient`.** Like the client itself, the `QueryClient` must not be a module-level singleton on the server (it would leak between concurrent requests) - but it *should* be a singleton in the browser (so navigating between pages keeps the cache warm). This is the same shape as `WPClient`'s own SSR-safety, applied to the `QueryClient`:

```ts
// app/query-client.ts
import { QueryClient } from '@tanstack/react-query';

let browserQueryClient: QueryClient | undefined;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // TanStack Query's default staleTime is 0, which means data hydrated
        // from a server prefetch is immediately "stale" and refetches on
        // mount - defeating the point of prefetching. A short staleTime
        // avoids that flash without going stale for long.
        staleTime: 60_000,
      },
    },
  });
}

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always a fresh instance, never shared across requests.
    return makeQueryClient();
  }
  // Browser: create once, reuse across navigations.
  return (browserQueryClient ??= makeQueryClient());
}
```

Wire `QueryClientProvider` in your app's root (not inside a component library - see [The Provider](#the-provider) for the same principle applied to `WordPressProvider`), so every route shares the one per-request/per-browser-session client:

```tsx
// app/root.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router';
import { getQueryClient } from './query-client';

export default function App() {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
```

**React Router v7 loader example.** Prefetch in the loader with the same `xQueryOptions` factory the hook uses, `dehydrate()` the result, and wrap the page in `HydrationBoundary` so the hook finds an already-warm cache entry instead of refetching:

```tsx
// app/routes/blog.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { createWordPressClient } from '@devgateway/wp-react-lib/v2';
import { usePosts, postsQueryOptions } from '@devgateway/wp-react-lib/v2/query';
import { getQueryClient } from '../query-client';
import type { Route } from './+types/blog';

export async function loader({ request }: Route.LoaderArgs) {
  const client = createWordPressClient({ baseUrl: '/wp', origin: new URL(request.url).origin });
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(postsQueryOptions(client, { perPage: 10 }));

  return { dehydratedState: dehydrate(queryClient) };
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <BlogIndex />
    </HydrationBoundary>
  );
}

function BlogIndex() {
  // Same params as the loader's prefetch, so it's the same query key -
  // this renders immediately from the hydrated cache, no second fetch.
  const { data } = usePosts({ perPage: 10 });
  return <Post posts={data?.data} />;
}
```

For more than one query per route, `Promise.all([queryClient.prefetchQuery(...), queryClient.prefetchQuery(...)])` before `dehydrate()` - a single `dehydrate()` call captures everything already in the cache at that point.

**A note on TanStack's newer "advanced SSR" guide** ([tanstack.com/query/latest/.../advanced-ssr](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr)): it centers on React Server Components (`await queryClient.query(...)` directly inside an `async` Server Component, no `useQuery` involved) - a Next.js App Router concept where Server and Client Components are genuinely different render trees. React Router v7 doesn't have that split; the loader above and the component that calls `usePosts()` are the same component tree rendered once by the server and once (via hydration) by the client, which is exactly what the *basic* prefetch/dehydrate/`HydrationBoundary` pattern already documented above is for - it's still the current, correct pattern here, not something the newer guide supersedes for this framework. Its guidance to never render `queryClient.fetchQuery`'s raw result directly (only ever read data back out via the hook) is exactly what this example already does - `BlogIndex` calls `usePosts()`, it never touches the loader's prefetch result directly.

**Streaming**, on the other hand, *does* apply here - `example/app/entry.server.tsx` already renders via `renderToPipeableStream`, a true streaming renderer. TanStack Query (v5.40.0+) supports dehydrating a query before it resolves - configure `dehydrate.shouldDehydrateQuery` to include pending queries, `void` the prefetch instead of `await`ing it, and consume it client-side with `useSuspenseQuery(postsQueryOptions(...))` (verified: the same `xQueryOptions` factories work with `useSuspenseQuery`, not just `useQuery` - that's what `queryOptions()` is for) inside a `<Suspense>` boundary. This is a genuine opt-in upgrade path, not something this adapter forces on you - the hooks above (`usePosts`, etc.) use plain `useQuery`, which is the simpler, non-streaming default.

### RTK Query adapter

If your app already uses Redux, `@devgateway/wp-react-lib/v2/rtk-query` gives you an RTK Query `createApi` slice (`wpApi`) instead of either the Context-based hooks or the TanStack adapter above. Install `@reduxjs/toolkit` (an optional peer dependency of this package) to use it.

```ts
import { configureStore } from '@reduxjs/toolkit';
import { createWordPressClient, wpApi } from '@devgateway/wp-react-lib/v2/rtk-query';

const wpClient = createWordPressClient({ baseUrl: 'https://example.com/wp' });

const store = configureStore({
  reducer: { [wpApi.reducerPath]: wpApi.reducer, /* ...your other reducers */ },
  middleware: (getDefaultMiddleware) =>
    // The WPClient is injected as the thunk extra argument, not imported as a
    // module-level singleton - every wpApi endpoint reads it via `queryApi.extra`.
    // This is what keeps the same `wpApi` slice usable against a different
    // client per environment/WP site, or (on the server) a fresh client per
    // request, without the slice itself ever hardcoding one.
    getDefaultMiddleware({ thunk: { extraArgument: wpClient } }).concat(wpApi.middleware),
});
```

```tsx
import { useGetPostsQuery } from '@devgateway/wp-react-lib/v2/rtk-query';

function BlogIndex() {
  const { data, isLoading, error } = useGetPostsQuery({ perPage: 10 });
  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;
  return <Post posts={data?.data} />;
}
```

Endpoints mirror the client's own methods 1:1: `getPosts`, `getPages`, `getMedia`, `getMenu`, `getCategories`, `getTaxonomy`, `search`, `getSettings`, `getYearRange` - each with an auto-generated `useXQuery`/`useLazyXQuery` hook pair, returning TanStack-style state (`data`, `isLoading`, `isFetching`, `error`, `refetch`, ...) native to RTK Query rather than this package's own `{ data, meta, loading, error, refetch }` shape. `data` is the full `WPResponse<T>` (`{ data, meta }`), so a post list is `data?.data`, not `data` directly.

Errors surface as a plain, serializable `WPQueryError` (`{ name, message, status?, url?, body? }`), not a `WPApiError` instance - RTK Query keeps every query's error in Redux state, and its `serializableCheck` middleware (on by default) flags class instances there; converting at this boundary avoids that without asking every consumer to disable the check.

**A note if your app's root Redux state isn't a plain object** (e.g. built on `redux-immutable`/`Immutable.Map`, as some existing DevGateway apps are): RTK Query's internals read `rootState[reducerPath]` directly - a hardcoded bracket access that returns `undefined` against an `Immutable.Map`, breaking `wpApi` silently. Register `wpApi.reducer` into a plain-object slice of your store (or a separate plain-object store) if your root state isn't already a plain object.

Two approaches to getting loader-fetched data into `wpApi`-backed components under React Router v7, depending on whether you want that data to actually live in the RTK Query cache (available to `useGetPostsQuery`/`useLazyGetPostsQuery` elsewhere, participates in `invalidateTags`/refetch-on-focus/etc.) or you just need to avoid a redundant fetch for data a loader already handed you directly.

#### Approach 1: a per-request store, seeded with `preloadedState`

Use this when the data should genuinely live in the `wpApi` cache - other components can then read it via the same endpoint/args without knowing a loader was involved. RTK Query's own SSR guide documents hydration via `next-redux-wrapper`'s `HYDRATE` action, dispatched into an *already-running* store - that package is Next.js Pages Router-specific and has no equivalent here. It's also unnecessary for a per-request-rendered app: construct a **fresh** store with `preloadedState` at `configureStore()` call time (not a store you mutate in place after creation), and `useGetPostsQuery` correctly finds the already-fulfilled cache entry on mount and doesn't refetch - no custom hydration action needed. (Verified directly in this package's own test suite, `src/v2/rtk-query/ssr.test.tsx` - both the "no window" SSR render and the fresh-store-with-`preloadedState` case are tested, not just documented.)

```ts
// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { wpApi } from '@devgateway/wp-react-lib/v2/rtk-query';
import type { WPClient } from '@devgateway/wp-react-lib/v2';

const reducer = { [wpApi.reducerPath]: wpApi.reducer };

export function makeStore(wpClient: WPClient, preloadedState?: { [wpApi.reducerPath]: ReturnType<typeof wpApi.reducer> }) {
  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: wpClient } }).concat(wpApi.middleware),
  });
}
```

```tsx
// app/routes/blog.tsx
import { Provider } from 'react-redux';
import { createWordPressClient } from '@devgateway/wp-react-lib/v2';
import { wpApi, useGetPostsQuery } from '@devgateway/wp-react-lib/v2/rtk-query';
import { makeStore } from '../store';
import type { Route } from './+types/blog';

export async function loader({ request }: Route.LoaderArgs) {
  const wpClient = createWordPressClient({ baseUrl: '/wp', origin: new URL(request.url).origin });
  const store = makeStore(wpClient);

  store.dispatch(wpApi.endpoints.getPosts.initiate({ perPage: 10 }));
  // Awaits every query `initiate`d above, in parallel - needed for more than one endpoint per route.
  await Promise.all(store.dispatch(wpApi.util.getRunningQueriesThunk()));

  return { preloadedState: store.getState(), wpBaseUrl: '/wp', wpOrigin: new URL(request.url).origin };
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  // A fresh store per render, seeded from the loader's preloadedState - not
  // a store reused/mutated across requests or across the server/client boundary.
  const wpClient = createWordPressClient({ baseUrl: loaderData.wpBaseUrl, origin: loaderData.wpOrigin });
  const store = makeStore(wpClient, loaderData.preloadedState);

  return (
    <Provider store={store}>
      <BlogIndex />
    </Provider>
  );
}

function BlogIndex() {
  // Same args as the loader's initiate() call, so it's the same cache entry -
  // renders immediately from preloadedState, no second fetch.
  const { data } = useGetPostsQuery({ perPage: 10 });
  return <Post posts={data?.data} />;
}
```

If your app already has one Redux store for everything (the more common case for an existing Redux app), register `wpApi.reducer`/`wpApi.middleware` into that store instead of a page-local one, and seed its `preloadedState` from whichever routes' loaders ran - React Router v7 runs all matched routes' loaders before rendering, so a root-level store can gather every matched route's contribution via `useMatches()` before constructing itself. The page-local pattern above is the simpler starting point when only one route needs `wpApi` data.

#### Approach 2: skip the query when a loader already returned the data as a prop

Use this when you don't need the data to live in the `wpApi` cache at all - a loader fetched it some other way (a plain `WPClient` call, an existing REST endpoint, whatever), handed it down as an ordinary prop, and a component would otherwise *also* try to fetch the same thing via `useGetPostsQuery`. Pass `skip: true` and it never fetches - no store, no `preloadedState`, no `initiate`, nothing SSR-specific to set up at all. (`wpApi` only has `getPosts`, a list endpoint, not a singular by-ID lookup - filtering it by `slug` returns a one-item array, which is how v1 and v2's plain hooks both look up a single post too.)

```tsx
// app/routes/post.$slug.tsx
import { createWordPressClient } from '@devgateway/wp-react-lib/v2';
import { useGetPostsQuery } from '@devgateway/wp-react-lib/v2/rtk-query';
import type { Route } from './+types/post.$slug';

export async function loader({ request, params }: Route.LoaderArgs) {
  const client = createWordPressClient({ baseUrl: '/wp', origin: new URL(request.url).origin });
  const { data } = await client.getPosts({ slug: params.slug });
  return { existingPost: data[0] as { slug: string; title: { rendered: string } } | undefined };
}

export default function PostView({ loaderData }: Route.ComponentProps) {
  const { existingPost } = loaderData;

  // The query is skipped entirely while existingPost is present - e.g. once the
  // user navigates client-side to a related post with no loader data yet, this
  // starts fetching normally instead of staying skipped forever.
  const { data, isLoading } = useGetPostsQuery({ slug: existingPost?.slug }, { skip: !!existingPost });

  const post = existingPost ?? data?.data[0];

  if (isLoading) return <div>Loading…</div>;
  return <h1>{post?.title.rendered}</h1>;
}
```

Best for master-detail views where the "master" list's loader (or an entirely different part of your Redux state) already has the full object for one item, and you only want the network request as a fallback for cases that item wasn't already available - e.g. a client-side navigation that didn't go through that loader.

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

- `EmbeddedGateway`'s registry mechanism is new in v2 and not a drop-in replacement for v1's `EmbeddedGateway` (which wired `react-redux`/`react-intl` directly) - see [Embedding custom components](#embedding-custom-components-inside-wp-content) above.

See the [package README](../../README.md) for v1's (current, unaffected) API.
