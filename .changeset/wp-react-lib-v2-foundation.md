---
"@devgateway/wp-react-lib": minor
---

Add an SSR-friendly, pure TypeScript `/v2` entry point (`@devgateway/wp-react-lib/v2`), built alongside the existing v1 API (unchanged).

Foundation: a typed `WPClient` (create with `createWordPressClient({ baseUrl, origin, locale, timeout, headers, fetch })`) and a universal `WordPressProvider`/`useWordPress`/`useWPClient` context that's safe to construct during server-side rendering (a fresh client per request, never a module-level singleton). `baseUrl` may be absolute anywhere, or relative (e.g. `/wp`, for apps behind a proxy) in the browser as-is; on the server a relative `baseUrl` resolves against `origin` when provided (e.g. `new URL(request.url).origin` in a loader, or an internal address like `http://wordpress:8080` to bypass the proxy), and otherwise throws a clear `WPConfigError` if a request is attempted with no `window` present.

Domain hooks - `usePosts`, `usePages`, `useMedia`, `useMenu`, `useCategories`, `useTaxonomy`, `useSearch`, `useSettings` - each returning a uniform `{ data, meta, loading, error, refetch }`, fetching on mount and refetching when params change, while skipping the initial fetch when `initialData` is hydrated from an SSR loader.

Content rendering - `templates/` (`Post`, `Page`, `Category`, `Taxonomy`) and `template-parts/` (`Content`, `PostTitle`, `PostDate`, `PostIntro`, `PostContent`, `PostIcon`, `PostLabel`) ported to typed, presentational components with no `semantic-ui-react` (unmaintained) or `react-redux` dependency. Embedded custom components inside WP content (`EmbeddedGateway`/`EmbedProvider`) are redesigned around a `registry` + `wrapper` mechanism instead of a hardcoded redux/react-intl stack - the host app's `wrapper` re-establishes whatever context its own embedded components need for their separately-mounted React root, and v2 takes no opinion on i18n.

Two optional caching adapters, each its own subpath so neither dependency is forced on consumers who don't use it (`@tanstack/react-query` and `@reduxjs/toolkit` are both optional peer dependencies):

- `@devgateway/wp-react-lib/v2/query` - TanStack Query wrappers (`usePosts`, `usePages`, `useMedia`, `useMenu`, `useCategories`, `useTaxonomy`, `useSearch`, `useSettings`) around `WPClient`, giving cross-component request dedup and caching that the plain `/v2` hooks don't have. Each also exports an `xQueryOptions(client, params)` factory usable directly with `queryClient.prefetchQuery` in a route loader, sharing the exact query key and fetcher the hook uses so hydration doesn't trigger a refetch.
- `@devgateway/wp-react-lib/v2/rtk-query` - an RTK Query `createApi` slice (`wpApi`) for apps that already use Redux. The `WPClient` is injected via the thunk `extraArgument` (never a module-level singleton), so the same slice works against a different client per environment or per request. Both loader approaches are documented: seeding a per-request store with `preloadedState` when the data should live in the `wpApi` cache, or `skip`-ing the query entirely when a loader already handed the data down as a plain prop.

**Dependency changes**, reflecting that v1's `immutable`/`react-intl`/`react-redux` requirement doesn't apply to `/v2` at all: all three move from hard `dependencies` to optional peer dependencies (`peerDependenciesMeta.optional: true`) - installing this package no longer pulls them in transitively; an app using only `/v2` (or a v1 app that already declares them itself, as `dvz-ui`/`example` both already do) is unaffected. `react`/`react-dom`'s peer range widens to `^18.3.1 || ^19.0.0`.
