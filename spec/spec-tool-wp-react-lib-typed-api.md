---
title: Type-Safe SSR-Compatible WordPress REST API Interface for wp-react-lib
version: 1.2
date_created: 2026-04-06
last_updated: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [tool, api, wordpress, typescript, react, architecture, ssr, nextjs]
---

# Introduction

This specification defines the requirements for refactoring the `wp-react-lib` package to provide a fully type-safe, SSR-compatible interface to the WordPress (WP) REST API. The current implementation uses plain Redux thunks + Immutable.js for all WP data fetching — an architecture that is incompatible with server-side rendering in Next.js App Router (React Server Components) and React Router v7 SSR `loader` patterns.

Although `dvz-ui` already adopts Redux Toolkit (`configureStore` from `@reduxjs/toolkit`), it still drives WP data fetching through Immutable.js-backed thunk reducers, with `serializableCheck: false` and `immutableCheck: false` — both direct blockers for SSR serialisation. RTK Query (`createApi`) is evaluated in this spec and found to be unsuitable for App Router SSR; TanStack Query is the recommended replacement for the WP data-fetching layer.

The target architecture replaces the Redux WP-fetching layer with a portable, framework-agnostic typed API client that runs on the server (Node.js, Edge Runtime) and on the client without modification. React integration is provided through three opt-in tiers: plain async functions (framework-agnostic), React hooks for client-side SPA usage, and SSR-aware primitives for Next.js App Router and React Router v7.

**Phase 2 — dvz-ui SSR Adaptation** (this document): After the `wp-react-lib` API rewrite, the `dvz-ui` component library requires a targeted SSR adaptation pass. Multiple `dvz-ui` components directly reference browser globals (`window`, `document`, `navigator`) at render time, use client-only React APIs without boundaries, and drive WP content fetching through Redux providers that have no server-side equivalent. This phase defines the requirements for making `dvz-ui` components safe to render in a Node.js / Edge server environment — eliminating hydration mismatches, enabling server-side data injection via the new API client, and correctly partitioning components between the RSC server tree and `'use client'` boundaries.

---

## 1. Purpose & Scope

**Purpose**: Define a fully TypeScript-typed, SSR-safe, maintainable, and testable API interface for `wp-react-lib` that replaces:

- Plain Redux thunks + Immutable.js data-fetching for WP content with a portable async API client.
- `window`/`document`-dependent initialisation that breaks SSR.
- Untyped `get`/`post` fetch utilities returning `Promise<unknown>`.
- String-concatenated URL builders.
- Plain JavaScript Redux action creators and reducers (`.js` files).
- Mixed `.js`/`.jsx`/`.ts`/`.tsx` file types with implicit `any`.
- React Context values typed as `any` (e.g., `MenuContext`, `AppContext`).
- Class component providers.

**Scope**:

- `packages/react-lib/wp-react-lib/src/api/` — HTTP transport and endpoint functions.
- `packages/react-lib/wp-react-lib/src/types.ts` and `post-type.ts` — data model types.
- `packages/react-lib/wp-react-lib/src/reducers/` — replaced by the typed API client; preserved as deprecated `/redux` sub-path.
- `packages/react-lib/wp-react-lib/src/providers/` — refactored to context providers backed by the API client (no Redux).
- `packages/react-lib/wp-react-lib/src/consumers/` — deprecated; replaced by hooks.
- `packages/react-lib/wp-react-lib/src/hooks/` — client-side hooks wrapping the API client.
- `packages/react-lib/wp-react-lib/src/ssr/` — **new** SSR helpers for Next.js and React Router v7.
- `packages/react-lib/wp-react-lib/src/query/` — **new** TanStack Query key factories and `queryOptions` helpers.

**Out of scope**: Chart components in `dvz-ui`, Superset integration, D3 rendering logic, the `example/` app, and the `dvz-ui` Redux store (which manages non-WP chart/filter state and is not subject to this spec).

**Phase 2 — dvz-ui SSR Adaptation Scope**:

- `packages/dvz-ui/src/utils/deviceType.ts` — refactor to be SSR-safe.
- `packages/dvz-ui/src/lib/hooks/window-dimensions.ts` — confirm SSR guards; ensure safe defaults.
- `packages/dvz-ui/src/lib/hooks/screen-orientation.ts` — confirm SSR guards.
- `packages/dvz-ui/src/layout/Layout.tsx` — split `RootLayout` into a server shell and a `'use client'` boundary component.
- `packages/dvz-ui/src/layout/ScrollTop.tsx` — mark `'use client'` (uses `window.scrollTo`).
- `packages/dvz-ui/src/layout/FlexWrapDetector.tsx` — mark `'use client'` (calls `deviceType()` at render time, uses `window` in effects).
- `packages/dvz-ui/src/layout/ResponsiveContainer.tsx` — ensure `@artsy/fresnel` `MediaContextProvider` + `mediaStyles` SSR pattern is correct; remove `.js` extension imports.
- `packages/dvz-ui/src/layout/containers/` — all containers (`SlugContainer`, `PageContainer`, `PostContainer`, `SlugPostContainer`, `PreviewTypeContainer`, `PreviewPageContainer`) MUST accept optional `initialData` props containing pre-fetched `SerializablePost[]` from the API client.
- `packages/dvz-ui/src/tracker/` — confirm all `window`/`document` access is inside `typeof window !== 'undefined'` guards; ensure no SSR crash.
- `packages/dvz-ui/src/tracker/internalTrafficUtils.ts` — already guarded; validate.

**Not in dvz-ui SSR scope**: Chart components (Nivo, D3 maps, Sankey, etc.) — these are inherently client-only and MUST be wrapped in `'use client'` components by the consuming application. Superset SDK integration. The `dvz-ui` Redux store for chart/filter state.

**Intended Audience**: Engineers working on the `data-viz-ui` monorepo who consume or maintain `wp-react-lib` in SPA, Next.js, or React Router SSR contexts.

---

## 2. Definitions

| Term | Definition |
|------|------------|
| **WP** | WordPress — the CMS whose REST API is consumed by this library. |
| **WP REST API** | The built-in HTTP REST interface exposed by WordPress at `/wp-json/`. |
| **ACF** | Advanced Custom Fields — a WordPress plugin that adds custom metadata fields to posts/pages. |
| **CPT** | Custom Post Type — a WordPress content type registered beyond built-in `post` and `page` types. |
| **Taxonomy** | A WordPress grouping mechanism (e.g., `category`, `tag`, or custom taxonomies). |
| **SSR** | Server-Side Rendering — HTML is generated on the server per request, not in the browser. |
| **RSC** | React Server Component — a React 18+ component that runs only on the server and can be `async`. |
| **CSR** | Client-Side Rendering — data fetching and rendering happen entirely in the browser. |
| **App Router** | The Next.js 13+ routing system based on the `app/` directory and RSC. |
| **React Router v7** | React Router's framework mode (formerly Remix) with server-side `loader` functions. |
| **Loader** | A React Router / Remix server function that fetches data before a route renders. |
| **RTK** | Redux Toolkit — `@reduxjs/toolkit`; used in `dvz-ui` for `configureStore` and thunk dispatch. |
| **RTK Query** | The data-fetching layer built into Redux Toolkit (`createApi`). Not currently used in this repo. |
| **TanStack Query** | `@tanstack/react-query` — a client-side data-fetching and caching library with first-class SSR support. |
| **dg/v1** | Custom WP REST API namespace provided by a DevGateway plugin (`/wp-json/dg/v1/`). |
| **`apiBaseUrl`** | Optional override for the WP REST API root (defaults to `VITE_REACT_APP_WP_API` env var or `/wp/wp-json`). |
| **`locale`** | BCP 47 language tag (e.g., `"en"`, `"fr"`) passed as the `lang` query parameter to WPML-enabled endpoints. |
| **Headless CMS** | A CMS that provides content via API only, without a coupled front-end rendering layer. |
| **PageResponse** | The typed tuple `{ data: Post[]; meta: PageMetaResponse }` returned by paginated WP endpoints. |
| **Edge Runtime** | A JS runtime (e.g., Vercel Edge, Cloudflare Workers) with a subset of Web APIs, no Node.js built-ins. |
| **ISR** | Incremental Static Regeneration — Next.js feature that rebuilds individual pages on a schedule. |
| **`'use client'`** | React RSC directive placed at the top of a file to declare that the module and all its imports run only in the browser. Required for any component that uses hooks, browser globals, or event listeners. |
| **SSR boundary** | The split point in the React component tree between server-rendered RSCs and `'use client'` components. Props crossing this boundary MUST be JSON-serialisable. |
| **`@artsy/fresnel`** | The CSS media query library used in `dvz-ui` for breakpoint-based rendering. Requires `MediaContextProvider` + `mediaStyles` injection for SSR hydration consistency. |
| **FOUC** | Flash of Unstyled Content — a visual artefact caused by CSS not being available at paint time, or by a responsive component rendering the wrong breakpoint on the server. |
| **Hydration mismatch** | An error thrown by React when the HTML rendered on the server differs from the initial client render. Caused by browser-global access at render time or non-deterministic component output. |
| **`initialData`** | An optional prop accepted by `dvz-ui` container components containing pre-fetched `SerializablePost[]` from the API client. When present, client-side Redux fetching is bypassed. |

---

## 3. Requirements, Constraints & Guidelines

### General Requirements

- **REQ-001**: All files in `wp-react-lib/src/` MUST be TypeScript (`.ts` or `.tsx`). No `.js` or `.jsx` files.
- **REQ-002**: No use of the `any` type except at documented interop boundaries. All `any` uses MUST carry an `// INTEROP:` comment.
- **REQ-003**: All public API functions MUST return explicitly typed Promises (e.g., `Promise<ApiResponse<Post[]>>`).
- **REQ-004**: The API client MUST be instantiable in Node.js, Edge Runtime, and browsers without modification.
- **REQ-005**: The API client MUST NOT reference `window`, `document`, `localStorage`, or any other browser-only global directly.
- **REQ-006**: All React Contexts MUST have typed values — `React.createContext<T>` parameterised with a concrete interface, never `any` or `unknown`.
- **REQ-007**: The `index.js` entry point MUST be replaced with `index.ts` with explicit named exports.
- **REQ-008**: All `console.log` debug statements MUST be removed from production code.

### API Layer Requirements

- **REQ-009**: HTTP transport MUST use the native `fetch` API (Node.js 18+, Edge Runtime, browsers). No additional HTTP client dependency.
- **REQ-010**: Transport functions MUST be generic: `get<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>>`.
- **REQ-011**: URL construction MUST use `URL` and `URLSearchParams` exclusively. String concatenation for query parameters is prohibited.
- **REQ-012**: Each endpoint function MUST accept a single typed params object (an interface).
- **REQ-013**: All endpoint functions MUST handle non-2xx responses by rejecting with a typed `ApiError` containing `status`, `statusText`, and `url`.
- **REQ-014**: Cache-busting MUST use `crypto.randomUUID()` or `Date.now().toString()`.
- **REQ-015**: The API client MUST accept optional `fetchOptions?: RequestInit` to allow callers to pass Next.js extended `fetch` directives (e.g., `{ next: { revalidate: 60 } }` or `{ cache: 'no-store' }`).

### SSR Requirements

- **REQ-016**: The API client MUST be safely constructable inside a Next.js App Router RSC, a `generateStaticParams` function, and a React Router v7 `loader` without any special configuration.
- **REQ-017**: SSR helper functions in `src/ssr/` MUST return plain JSON-serialisable objects — no `Date` instances, class instances, `Map`, or `Set`.
- **REQ-018**: When used in Next.js App Router, `fetch` calls MUST propagate caller-supplied `fetchOptions` so Next.js can apply per-request deduplication and ISR revalidation.
- **REQ-019**: The library MUST NOT import Redux, Immutable.js, or `react-redux` in the core API, SSR, or query layers. These are available only via the `@devgateway/wp-react-lib/redux` sub-path.
- **REQ-020**: All date values MUST be normalised to ISO 8601 strings (not `Date` objects) in all SSR-facing and serialisable types.
- **REQ-021**: The library MUST export TanStack Query helpers from `@devgateway/wp-react-lib/query`, enabling `prefetchQuery` in RSC and hydration in client components.

### Why Not RTK Query for SSR?

RTK Query (`createApi` from `@reduxjs/toolkit`) is evaluated here and **not recommended** as the SSR replacement for the following reasons:

- **RTK-001**: RTK Query state lives in the Redux store. Hydrating it requires serialising the entire store state to JSON and re-injecting it via script tags — incompatible with the Immutable.js-backed store in `dvz-ui` (which already sets `serializableCheck: false`).
- **RTK-002**: RTK Query's SSR support targets the **Pages Router** (`getServerSideProps` + `dispatch(endpoint.initiate(...))` + `getRunningQueriesThunk`). There is no first-class App Router RSC integration in RTK v2.
- **RTK-003**: Adopting RTK Query would expand the Redux dependency surface instead of eliminating it from the WP data layer.

**The existing RTK usage in `dvz-ui`** (`configureStore`, thunk dispatch for chart/filter state) is out of scope and MUST NOT be removed or modified by this work.

### Redux Backwards-Compatibility Requirements

- **REQ-022**: Existing Redux action creators and reducers MUST be preserved and re-exported from the `@devgateway/wp-react-lib/redux` sub-path.
- **REQ-023**: The `/redux` sub-path MUST be marked `@deprecated` in its barrel `index.ts`.
- **REQ-024**: The Redux sub-path MUST internally call `createApiClient()` rather than the legacy raw `get`/`post` utilities.

### Provider / Hook Requirements

- **REQ-025**: All class component providers (e.g., `MediaProvider`) MUST be refactored to functional components.
- **REQ-026**: Client-side hooks (`usePosts`, `usePages`, etc.) MUST be implemented using TanStack Query `useQuery` in the `/query` sub-path, or as standalone `useEffect`-based hooks in the base package.
- **REQ-027**: Legacy consumer components MUST remain exported but marked `@deprecated`.
- **REQ-028**: `MenuContext` and `AppContext` MUST be given typed interfaces.

### Constraints

- **CON-001**: The public API surface MUST remain backward-compatible unless a major version bump is performed with a migration guide.
- **CON-002**: Redux and Immutable.js MUST be moved to `optionalDependencies` / `peerDependencies` for the `/redux` sub-path only — not required by the core package.
- **CON-003**: React remains a peer dependency and MUST NOT be bundled.
- **CON-004**: The core package MUST be compatible with Next.js App Router and React Router v7 without additional adapters.
- **CON-005**: The WPML `lang` query parameter MUST always be included in requests to localised endpoints.
- **CON-006**: All date values MUST be ISO 8601 strings in all public serialisable response shapes.
- **CON-007**: The `dvz-ui` Redux store (`configureStore` + Immutable.js for chart/filter state) is out of scope and MUST NOT be modified by this work.

### Guidelines

- **GUD-001**: Prefer `interface` over `type` for object shapes; use `type` for unions and utility types.
- **GUD-002**: Prefer `unknown` over `any`; narrow with a type guard before use.
- **GUD-003**: SSR helpers SHOULD NOT be imported inside `'use client'` components.
- **GUD-004**: Hooks SHOULD accept `apiBaseUrl` to support multi-site configurations.
- **GUD-005**: Export barrel `index.ts` per sub-directory (api, providers, hooks, ssr, query) for tree-shaking.
- **GUD-006**: For Next.js App Router, prefer RSC `async` components with direct API client calls over client-side fetching for non-interactive content.
- **GUD-007**: For React Router v7, all WP API calls MUST live in route `loader` functions; client components receive data via `useLoaderData()`.

### Patterns

- **PAT-001**: `createApiClient(baseUrl?, defaultFetchOptions?)` — factory returning a typed `WpApiClient`; enables DI and testing without env var mocking.
- **PAT-002**: Discriminated union async state: `{ status: 'idle' } | { status: 'loading' } | { status: 'success'; data: T; meta: M } | { status: 'error'; error: ApiError }`.
- **PAT-003**: `wpQueryKeys` — stable, serialisable cache key factories used consistently across server `prefetchQuery` and client `useQuery`.
- **PAT-004**: Next.js RSC pattern — call `createApiClient()` inside RSC, await endpoint, pass `SerializablePost[]` as props to `'use client'` components.
- **PAT-005**: React Router v7 pattern — call `createApiClient()` inside `loader`, return typed data, consume with `useLoaderData<typeof loader>()`.

---

### dvz-ui SSR Requirements

#### Component Boundary Classification

- **REQ-030**: Every `dvz-ui` component file that uses `window`, `document`, `navigator`, `localStorage`, `sessionStorage`, `useEffect`, `useState`, `useRef`, or any browser event listener MUST include `'use client'` as the **first line** of the file, or be refactored so that all such access occurs exclusively inside `useEffect` (never at render time).
- **REQ-031**: `packages/dvz-ui/src/layout/ScrollTop.tsx` MUST be marked `'use client'` (it calls `window.scrollTo` inside `useEffect`).
- **REQ-032**: `packages/dvz-ui/src/layout/FlexWrapDetector.tsx` MUST be marked `'use client'` (it calls `deviceType()` at render time and reads `window` in effects).
- **REQ-033**: `packages/dvz-ui/src/tracker/withGoogleAnalytics.tsx` and `packages/dvz-ui/src/tracker/InternalTrafficToggle.tsx` MUST be marked `'use client'`.

#### Browser-Global Safety

- **REQ-034**: `packages/dvz-ui/src/utils/deviceType.ts` MUST guard all `window` and `navigator` accesses with `typeof window !== 'undefined'`. When called in a server environment (where `typeof window === 'undefined'`), the function MUST return `'desktop'` as the default value without throwing.
- **REQ-035**: `packages/dvz-ui/src/lib/hooks/window-dimensions.ts` — the existing `typeof window !== 'undefined'` guards MUST be retained and MUST cover **all** paths in the initial `useState` factory function. The SSR initial state MUST return `{ width: 0 }` (plus optional `height: 0` and `deviceType: 'desktop'`) so that the server render is deterministic.
- **REQ-036**: `packages/dvz-ui/src/lib/hooks/screen-orientation.ts` MUST guard any `window` or `screen` access with `typeof window !== 'undefined'` and return a safe default (e.g., `'landscape'`) on the server.
- **REQ-037**: `RootLayout` in `packages/dvz-ui/src/layout/Layout.tsx` MUST be split into:
  1. A **server shell** (`RootLayoutShell`) — a plain (non-`'use client'`) component that renders the Redux `Provider`, `IntlProvider`, `AppContextProvider`, `SettingProvider`, and `SettingsConsumer` tree. This component contains no `useEffect`, no `useState`, and no browser-global access.
  2. A **`'use client'` boundary** (`ClientEffects`) — a minimal component that mounts as a child of the shell and is responsible only for the `useEffect` that triggers hash-scroll and the locale-dispatch `useEffect`. It renders `null` (no DOM output).
- **REQ-038**: No `dvz-ui` component that is not marked `'use client'` MAY call `deviceType()`, `window.*`, `document.*`, or `navigator.*` at module initialisation time or at the top level of a render function.

#### Responsive Media SSR

- **REQ-039**: `packages/dvz-ui/src/layout/ResponsiveContainer.tsx` MUST inject `@artsy/fresnel` `mediaStyles` using the established pattern: a `<style>` tag rendered in the component tree (not via `useEffect`). This MUST work in both Next.js `<head>` injection and inline `<style>` patterns.
- **REQ-040**: A `MediaContextProvider` MUST wrap the top of the `dvz-ui` component tree (e.g., inside `RootLayoutShell`) so that `@artsy/fresnel` can correctly determine which breakpoints to render on the server. On the server, it MUST render all breakpoints (no `onlyMatch` restriction), relying on injected CSS `mediaStyles` to control visibility. This prevents hydration mismatches caused by the server rendering a different breakpoint than the client.
- **REQ-041**: All imports in `ResponsiveContainer.tsx` and its immediate dependencies MUST use TypeScript-resolvable paths (no `.js` or `.jsx` extensions in TypeScript source files).

#### Container SSR Data Injection

- **REQ-042**: All layout containers in `packages/dvz-ui/src/layout/containers/` — `SlugContainer`, `PageContainer`, `PostContainer`, `SlugPostContainer`, `PreviewTypeContainer`, `PreviewPageContainer` — MUST accept an optional `initialData?: SerializablePost[]` prop (imported from `@devgateway/wp-react-lib`).
- **REQ-043**: When `initialData` is provided to a container, the container MUST render the content directly from `initialData` without dispatching any Redux action or mounting any `*Provider`/`*Consumer` pair from `wp-react-lib`. This enables pure server-driven rendering with zero client-side WP fetches.
- **REQ-044**: When `initialData` is **not** provided, existing Redux `*Provider`/`*Consumer` behaviour MUST be preserved unchanged, ensuring full backward compatibility for SPA deployments.
- **REQ-045**: The `initialData` prop value MUST conform to `SerializablePost[]` — ISO 8601 string dates, no class instances, no `Map`, no `Set` — so it is safe to pass across the RSC/client boundary as a serialised JSON prop.

#### Module File Standards

- **REQ-046**: All `.js` and `.jsx` import paths within `packages/dvz-ui/src/` that resolve to TypeScript source files MUST be updated to use extension-free or `.ts`/`.tsx` paths. (e.g., `import Footer from "./Footer.jsx"` → `import Footer from "./Footer"`).
- **REQ-047**: `packages/dvz-ui/src/layout/ResponsiveContainer.tsx` MUST import `AppMedia` from a `.ts` source path, removing the `@ts-ignore` comment above `Media.mediaStyles`.

#### Constraints (dvz-ui)

- **CON-008**: The `dvz-ui` Redux store (`configureStore` for chart/filter state) MUST NOT be modified. Only WP-content-fetching containers are affected by the SSR adaptation.
- **CON-009**: The `'use client'` directive MUST NOT be added to `packages/dvz-ui/src/layout/Layout.tsx` at the module level — only the extracted `ClientEffects` leaf component is client-only, preserving the server renderability of the outer layout shell.
- **CON-010**: `initialData` prop addition to containers MUST be implemented as a non-breaking, additive change. Existing container APIs (all existing props) MUST remain unchanged.

#### Guidelines (dvz-ui)

- **GUD-008**: Prefer passing pre-fetched `initialData` over relying on client-side Redux fetching in any Next.js App Router or React Router v7 SSR deployment. Redux fetching remains the fallback for SPA mode only.
- **GUD-009**: Chart and visualisation components (Nivo, D3, Superset) are inherently client-only. Consuming applications MUST wrap these in their own `'use client'` boundaries — `dvz-ui` does not add `'use client'` to chart component files.
- **GUD-010**: Use `useEffect(() => { ... }, [])` (empty dependency array) for all one-time browser initialisation code (hash scroll, GA initialisation). NEVER execute browser-global code in the component body outside of `useEffect`.

## 4. Interfaces & Data Contracts

### 4.1 HTTP Transport

```typescript
export interface ApiResponse<T> {
  data: T;
  /** HTTP response headers (e.g., x-wp-total, x-wp-totalpages). */
  meta: Record<string, string>;
}

export interface ApiError {
  status: number;
  statusText: string;
  url: string;
}

export function get<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>>;

export function post<TBody, TResponse>(
  url: string,
  body: TBody,
  options?: RequestInit & { isBlob?: boolean }
): Promise<ApiResponse<TResponse>>;
```

### 4.2 Typed API Client

```typescript
export interface WpApiClient {
  getPosts(params: GetPostsParams): Promise<ApiResponse<Post[]>>;
  getPages(params: GetPagesParams): Promise<ApiResponse<Post[]>>;
  getMenu(params: GetMenuParams): Promise<ApiResponse<MenuItem[]>>;
  getSettings(params: GetSettingsParams): Promise<ApiResponse<DgSettings>>;
  getMedia(params: GetMediaParams): Promise<ApiResponse<Media>>;
  getCategories(params: GetCategoriesParams): Promise<ApiResponse<WpCategory[]>>;
  getTaxonomy(params: GetTaxonomyParams): Promise<ApiResponse<Taxonomy[]>>;
  getYearRange(params?: BaseApiParams): Promise<ApiResponse<YearRange>>;
  search(params: SearchParams): Promise<ApiResponse<SearchResults>>;
  getPostsByTypeAndTaxonomy(params: GetPostsByTaxonomyParams): Promise<ApiResponse<Post[]>>;
}

/**
 * Creates a typed WP API client safe in Node.js, Edge Runtime, and browsers.
 * Call directly inside RSC, loaders, or client hooks.
 *
 * @param baseUrl              WP REST API root. Defaults to VITE_REACT_APP_WP_API env var.
 * @param defaultFetchOptions  Merged into every fetch call. Pass
 *   `{ next: { revalidate: N } }` for Next.js ISR or `{ cache: 'no-store' }` for drafts.
 */
export function createApiClient(
  baseUrl?: string,
  defaultFetchOptions?: RequestInit
): WpApiClient;
```

### 4.3 Endpoint Parameter Interfaces

```typescript
export interface BaseApiParams {
  apiBaseUrl?: string;
  /** Per-call fetch options merged over client-level defaults. */
  fetchOptions?: RequestInit;
}

export interface LocalisedParams extends BaseApiParams {
  /** BCP 47 locale tag; maps to the WP `lang` query parameter. */
  locale: string;
}

export interface GetPostsParams extends LocalisedParams {
  slug?: string;
  type?: string;           // WP post type slug, defaults to "posts"
  taxonomy?: string;
  categories?: string | string[];
  before?: Date | string;  // serialised to ISO 8601 at call time
  after?: Date | string;
  perPage?: number;
  page?: number;
  fields?: string[];       // maps to _fields query parameter
  search?: string;
  previewNonce?: string;
  previewId?: string;
}

export interface GetPagesParams extends LocalisedParams {
  slug?: string;
  parent?: string;
  before?: Date;
  perPage?: number;
  page?: number;
  fields?: string[];
  search?: string;
  previewNonce?: string;
  previewId?: string;
  noCache?: boolean;
}

export interface GetCategoriesParams extends LocalisedParams {
  context?: 'view' | 'embed' | 'edit';
  page?: number;
  perPage?: number;
  search?: string;
  exclude?: string;
  include?: string;
  order?: 'asc' | 'desc';
  orderby?: 'id' | 'include' | 'name' | 'slug' | 'include_slugs' |
            'term_group' | 'description' | 'count';
  hideEmpty?: boolean;
  parent?: string;
  post?: string;
  slug?: string;
}

export interface GetMenuParams extends LocalisedParams { name: string; }
export interface GetSettingsParams extends LocalisedParams { changeUUID?: string; }
export interface GetMediaParams extends LocalisedParams { slug: string; }
export interface GetTaxonomyParams extends LocalisedParams { name: string; }

export interface SearchParams extends LocalisedParams {
  context?: string;
  page?: number;
  perPage?: number;
  search?: string;
  type?: string;
  subtype?: string;
}

export interface GetPostsByTaxonomyParams extends LocalisedParams {
  type: string;
  category: string;
  value: string;
  page?: number;
  perPage?: number;
}
```

### 4.4 SSR Helpers (`src/ssr/index.ts`)

```typescript
/**
 * Post with all Date fields normalised to ISO 8601 strings.
 * Safe to pass as Next.js RSC props or React Router loader data.
 */
export type SerializablePost =
  Omit<Post, 'date' | 'date_gmt' | 'modified' | 'modified_gmt'> & {
    date: string;
    date_gmt: string;
    modified: string;
    modified_gmt: string;
  };

export interface PostsPayload {
  posts: SerializablePost[];
  total: number;
  totalPages: number;
}

export interface PagePayload {
  page: SerializablePost | null;
  total: number;
  totalPages: number;
}

export async function fetchPostsSsr(
  client: WpApiClient,
  params: GetPostsParams
): Promise<PostsPayload>;

export async function fetchPageSsr(
  client: WpApiClient,
  params: GetPagesParams
): Promise<PagePayload>;

export async function fetchSettingsSsr(
  client: WpApiClient,
  params: GetSettingsParams
): Promise<DgSettings>;
```

### 4.5 TanStack Query Integration (`src/query/index.ts`)

```typescript
/**
 * Stable, serialisable cache key factories.
 * Use the same key in RSC `prefetchQuery` and in client `useQuery` for zero-cost hydration.
 */
export const wpQueryKeys = {
  posts:      (params: GetPostsParams)      => ['wp', 'posts',      params] as const,
  pages:      (params: GetPagesParams)      => ['wp', 'pages',      params] as const,
  settings:   (params: GetSettingsParams)   => ['wp', 'settings',   params] as const,
  categories: (params: GetCategoriesParams) => ['wp', 'categories', params] as const,
  menu:       (params: GetMenuParams)       => ['wp', 'menu',       params] as const,
  media:      (params: GetMediaParams)      => ['wp', 'media',      params] as const,
  search:     (params: SearchParams)        => ['wp', 'search',     params] as const,
  taxonomy:   (params: GetTaxonomyParams)   => ['wp', 'taxonomy',   params] as const,
};

// One queryOptions helper per endpoint — enables prefetchQuery (server) and useQuery (client).
export function postsQueryOptions(
  client: WpApiClient, params: GetPostsParams
): QueryOptions<ApiResponse<Post[]>>;

export function pagesQueryOptions(
  client: WpApiClient, params: GetPagesParams
): QueryOptions<ApiResponse<Post[]>>;

export function settingsQueryOptions(
  client: WpApiClient, params: GetSettingsParams
): QueryOptions<ApiResponse<DgSettings>>;

export function categoriesQueryOptions(
  client: WpApiClient, params: GetCategoriesParams
): QueryOptions<ApiResponse<WpCategory[]>>;

export function menuQueryOptions(
  client: WpApiClient, params: GetMenuParams
): QueryOptions<ApiResponse<MenuItem[]>>;

export function mediaQueryOptions(
  client: WpApiClient, params: GetMediaParams
): QueryOptions<ApiResponse<Media>>;

export function searchQueryOptions(
  client: WpApiClient, params: SearchParams
): QueryOptions<ApiResponse<SearchResults>>;

export function taxonomyQueryOptions(
  client: WpApiClient, params: GetTaxonomyParams
): QueryOptions<ApiResponse<Taxonomy[]>>;
```

### 4.6 Context Types (Client-Side)

```typescript
export interface AppContextType {
  apiBaseUrl: string;
  locale: string;
  changeUUID?: string;
}

export interface MenuContextType {
  items: MenuItem[] | null;
  locale: string | undefined;
  loading: boolean;
  error: ApiError | null;
}

export interface PostContextType {
  posts: Post[] | null;
  meta: PageMetaResponse | null;
  locale: string | undefined;
  loading: boolean;
  error: ApiError | null;
}

export interface PageContextType {
  pages: Post[] | null;
  meta: PageMetaResponse | null;
  locale: string | undefined;
  loading: boolean;
  error: ApiError | null;
}
```

### 4.7 WpCategory Type (Disambiguation)

Rename the existing WP category response type from `Category` to `WpCategory` to avoid collision with the custom `Category` dimension type used in chart configuration:

```typescript
/** WordPress REST API category term (/wp/v2/categories). */
export interface WpCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: Record<string, unknown>;
  _links: Links;
}
```

### 4.8 Redux Backwards-Compatibility Sub-Path (`/redux`)

```typescript
// @devgateway/wp-react-lib/redux
// @deprecated — Use createApiClient() with TanStack Query (/query) or SSR helpers (/ssr) instead.
// All action creators below call createApiClient() internally.
export { wordpress as wordpressReducer } from './reducers/wordpress';
export { getPosts, getPages, getMenu, getSettings, getMedia, getCategories } from './reducers/actions';
export * from './reducers/constants';
```

### 4.9 Package Exports (`package.json`)

```json
{
  "exports": {
    ".":        { "types": "./dist/types/index.d.ts",         "import": "./dist/esm/index.js" },
    "./api":    { "types": "./dist/types/api/index.d.ts",     "import": "./dist/esm/api/index.js" },
    "./ssr":    { "types": "./dist/types/ssr/index.d.ts",     "import": "./dist/esm/ssr/index.js" },
    "./query":  { "types": "./dist/types/query/index.d.ts",   "import": "./dist/esm/query/index.js" },
    "./hooks":  { "types": "./dist/types/hooks/index.d.ts",   "import": "./dist/esm/hooks/index.js" },
    "./redux":  { "types": "./dist/types/redux/index.d.ts",   "import": "./dist/esm/redux/index.js" }
  }
}
```

### 4.10 dvz-ui Container SSR Props

All layout container components gain an optional `initialData` prop and a typed `ContainerSSRProps` mixin:

```typescript
// packages/dvz-ui/src/layout/containers/types.ts
import type { SerializablePost } from '@devgateway/wp-react-lib';

/** Mixin accepted by all layout container components for SSR data injection. */
export interface ContainerSSRProps {
  /**
   * Pre-fetched WP content from the API client (server-side).
   * When provided, Redux Provider/Consumer pairs are bypassed entirely.
   * Value MUST be JSON-serialisable (SerializablePost[]).
   */
  initialData?: SerializablePost[];
}
```

Updated container signatures (example — `SlugContainer`):

```typescript
// packages/dvz-ui/src/layout/containers/SlugContainer.tsx
import type { ContainerSSRProps } from './types';

interface SlugContainerProps extends ContainerSSRProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  pages?: PostType;
}

const SlugContainer = ({ header, footer, pages, initialData }: SlugContainerProps = {}) => {
  const { lan: locale, slug } = useParams();

  // SSR path: initialData injected by server — bypass Redux fetching entirely
  if (initialData) {
    return (
      <ResponsiveContainer header={header} footer={footer}>
        <Page pages={initialData} />
      </ResponsiveContainer>
    );
  }

  // SPA fallback: existing Redux Provider/Consumer behaviour
  if (pages) { ... }
  return (
    <PageProvider locale={locale} slug={slug} store={slug}>
      ...
    </PageProvider>
  );
};
```

### 4.11 dvz-ui Layout Shell / Client Boundary Split

```typescript
// packages/dvz-ui/src/layout/Layout.tsx

// ── Server shell (no 'use client') ───────────────────────────────────────────
export const RootLayoutShell = ({ locale, children }: { locale: string; children: React.ReactNode }) => (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages[locale as Locale]}>
      <AppContextProvider getComponent={getComponentByNameIgnoreCase} store={store} locale={locale}>
        <SettingProvider locale={locale} changeUUID={null}>
          <SettingsConsumer>
            <CustomizerWrapper />
            {children}
          </SettingsConsumer>
        </SettingProvider>
      </AppContextProvider>
    </IntlProvider>
  </Provider>
);

// ── Client-only effects (must be 'use client') ────────────────────────────────
// packages/dvz-ui/src/layout/ClientEffects.tsx
'use client';
export const ClientEffects = ({ locale }: { locale: string }) => {
  useEffect(() => {
    if (window.location.hash) {
      window.setTimeout(() => {
        const el = document.getElementById(window.location.hash.substring(1));
        el?.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 2000);
    }
  }, []);

  useEffect(() => {
    store.dispatch(updateIntl({ locale, formats: {}, messages: messages[locale as Locale] }));
  }, [locale]);

  return null; // renders no DOM output
};

// ── Route component ───────────────────────────────────────────────────────────
// packages/dvz-ui/src/layout/RootLayout.tsx  (no 'use client')
const RootLayout = () => {
  const { lan: locale } = useParams();
  const { pathname } = useLocation();
  if (!locale) return <Navigate to={defaultLocale} replace />;
  if (!Object.keys(messages).includes(locale)) return <Navigate to={`/${defaultLocale}${pathname}`} replace />;

  return (
    <RootLayoutShell locale={locale}>
      <ClientEffects locale={locale} />
      <Outlet />
    </RootLayoutShell>
  );
};
```

### 4.12 dvz-ui SSR-Safe `deviceType` API

```typescript
// packages/dvz-ui/src/utils/deviceType.ts

export type DeviceType = 'mobile' | 'tablet' | 'midTablet' | 'laptop' | 'desktop' | 'wide' | 'unknown';

/** SSR-safe default returned when window is unavailable. */
const SSR_DEFAULT: DeviceType = 'desktop';

function getDeviceType(): DeviceType {
  if (typeof window === 'undefined') return SSR_DEFAULT;
  const screenWidth = window.innerWidth;
  // ... existing breakpoint logic unchanged ...
  return SSR_DEFAULT;
}

export default getDeviceType;
```

---

## 5. Acceptance Criteria

- **AC-001**: Given `createApiClient()` called inside a Next.js RSC, when `client.getPosts({ locale: 'en', perPage: 10 })` is awaited, then it returns `ApiResponse<Post[]>` and TypeScript compiles with `strict: true` and zero errors.
- **AC-002**: Given a non-200 HTTP response, when any endpoint is called, then the Promise rejects with an `ApiError` containing `status`, `statusText`, and `url`.
- **AC-003**: Given `fetchPostsSsr(client, { locale: 'en' })` in an RSC, when the result is passed as props to a `'use client'` child, then Next.js raises no serialisation error (validated by `JSON.stringify` completing without throw).
- **AC-004**: Given `postsQueryOptions` used with `queryClient.prefetchQuery()` in an RSC, when the same `wpQueryKeys.posts(...)` key is used in a client `useQuery()`, then data is hydrated without a second network request.
- **AC-005**: Given a React Router v7 `loader` calling `createApiClient().getPosts(...)`, when `useLoaderData<typeof loader>()` is used, then TypeScript infers the full return type with no `any`.
- **AC-006**: Given `@devgateway/wp-react-lib/redux` is imported and existing action creators are dispatched, then they call `createApiClient()` internally and behave identically to the previous implementation.
- **AC-007**: Given `find packages/react-lib/wp-react-lib/src -name "*.js" -o -name "*.jsx"`, then it returns zero results.
- **AC-008**: Given `grep -rn "window\." packages/react-lib/wp-react-lib/src/api packages/react-lib/wp-react-lib/src/ssr`, then it returns zero results.
- **AC-009**: Given `pnpm --filter @devgateway/wp-react-lib exec tsc --noEmit --strict`, then it exits with code `0`.
- **AC-010**: Given `grep -r "Math.random\|console.log" packages/react-lib/wp-react-lib/src`, then it returns zero results.
- **AC-011**: Given `defaultFetchOptions: { next: { revalidate: 3600 } }` passed to `createApiClient()`, when `client.getSettings({ locale: 'en' })` is called inside an RSC, then the underlying `fetch` carries those options and Next.js applies ISR revalidation.
- **AC-012**: Given `grep -rn "from 'redux'" src/api src/ssr src/query`, then it returns zero results (Redux confined to `/redux` sub-path only).

### dvz-ui SSR Acceptance Criteria

- **AC-013**: Given `getDeviceType()` called in a Node.js process where `typeof window === 'undefined'`, then it returns `'desktop'` without throwing.
- **AC-014**: Given `RootLayoutShell` rendered in a Node.js environment (e.g., `renderToString`), then no reference to `window`, `document`, or `navigator` is executed, and no React hydration warning is emitted.
- **AC-015**: Given `SlugContainer` rendered with `initialData={posts}` (where `posts` is a `SerializablePost[]`), then no Redux `PageProvider` is mounted and no WP API request is dispatched.
- **AC-016**: Given `SlugContainer` rendered **without** `initialData`, then it behaves identically to its pre-SSR implementation (Redux `PageProvider`/`PageConsumer` tree is mounted).
- **AC-017**: Given `ResponsiveContainer` rendered server-side, then `@artsy/fresnel` `mediaStyles` CSS is present in the rendered HTML output (injected via `<style>` tag) and no hydration mismatch warning is produced on the client.
- **AC-018**: Given `grep -rn "\.jsx\|\.js'" packages/dvz-ui/src --include="*.ts" --include="*.tsx"` (import statements only), then it returns zero results.
- **AC-019**: Given `pnpm --filter @devgateway/dvz-ui-react exec tsc --noEmit`, then it exits with code `0` after the SSR adaptation.
- **AC-020**: Given `FlexWrapDetector` rendered server-side (e.g., via `renderToString`), then no `window` or `navigator` access occurs during the render phase and no exception is thrown.

---

## 6. Test Automation Strategy

- **Test Levels**:
  - **Unit**: Each API client function with mocked `fetch` (`vi.stubGlobal('fetch', ...)` or msw).
  - **Unit**: URL construction for all endpoints — assert correct `URLSearchParams` encoding, absence of `undefined` literals.
  - **Unit**: SSR helper serialisation — assert `JSON.stringify` succeeds on all returned payloads.
  - **Integration**: React providers + hooks with msw v2 mock server.
  - **Integration**: TanStack Query `prefetchQuery` → `dehydrate` → `HydrationBoundary` → `useQuery` roundtrip.
  - **Type-level**: `tsc --noEmit --strict` in CI on every PR.

- **Frameworks**:
  - Test runner: **Vitest**.
  - HTTP mocking: **msw v2** (`http.get`, `http.post` handlers).
  - React testing: `@testing-library/react` with `renderHook`.

- **Test Data Management**:
  - Fixture files in `src/__fixtures__/` per entity type: `post.fixture.ts`, `page.fixture.ts`, `wpCategory.fixture.ts`, `settings.fixture.ts`.
  - All fixtures use `SerializablePost` shapes (ISO strings, no `Date` objects).

- **CI/CD Integration**:
  - `pnpm --filter @devgateway/wp-react-lib test` on every PR.
  - `pnpm --filter @devgateway/wp-react-lib build` enforces TypeScript compilation.
  - Separate CI job: minimal Next.js fixture app using `createApiClient()` inside an RSC builds via `next build`.

- **Coverage Requirements**: Minimum 80% line coverage for `api/`, `ssr/`, and `query/` directories.

### dvz-ui SSR Test Strategy

- **Test Levels**:
  - **Unit**: `getDeviceType()` called with `window` undefined — assert return value is `'desktop'`.
  - **Unit**: `useWindowDimensionsAndDevice` initial state when `typeof window === 'undefined'` — assert `{ width: 0 }` (using `renderHook` in a jsdom-free environment or by stubbing `window`).
  - **Unit**: Each layout container with `initialData` prop — assert `PageProvider` is NOT in the rendered tree (use `@testing-library/react` `queryByTestId` or check Redux dispatch call count is zero).
  - **Unit**: Each layout container **without** `initialData` — assert `PageProvider` IS in the rendered tree (backward compatibility).
  - **Integration**: `renderToString(RootLayoutShell)` — assert no exception, assert `mediaStyles` CSS string present in output, assert no `window` / `document` access (use a `window`-free Node.js environment).
  - **Integration**: `renderToString(SlugContainer)` with `initialData` — assert rendered HTML contains post content and no Redux dispatches.
  - **Snapshot**: `RootLayoutShell` with a mock locale and `initialData` — snapshot the rendered HTML for regression.

- **Frameworks**:
  - Same as Phase 1: Vitest + `@testing-library/react`.
  - Add `@testing-library/react` `renderToString` equivalent via `react-dom/server` for server-render tests.
  - Use `vi.stubGlobal('window', undefined)` to simulate a server environment in Vitest.

- **Test Data Management**:
  - Re-use `SerializablePost` fixtures from `wp-react-lib/src/__fixtures__/`.
  - Add `dvz-ui/src/__fixtures__/serialisablePost.fixture.ts` with two or three minimal `SerializablePost` entries for container rendering tests.

- **CI/CD Integration**:
  - Add `pnpm --filter @devgateway/dvz-ui-react test` to the CI pipeline alongside the existing `wp-react-lib` test job.
  - Add `pnpm --filter @devgateway/dvz-ui-react exec tsc --noEmit` as a separate typecheck job.

---

## 7. Rationale & Context

### Why Remove Redux from the WP Fetching Layer?

Redux (with Immutable.js, `serializableCheck: false`) drives all WP content fetching in the current implementation. This causes:

1. **No server-side pre-fetching** — every page load requires a client-side waterfall fetch after hydration, slowing TTFB.
2. **Blocks React Streaming** — Redux's synchronous store initialisation conflicts with the concurrent streaming renderer.
3. **No ISR or `generateStaticParams`** — Next.js static generation cannot call Redux action creators type-safely.
4. **Bundle inflation** — Redux + Immutable.js adds ~25 KB gzipped to pages where content could be inlined at build time.
5. **`serializableCheck: false`** — the `dvz-ui` store config disables Redux's serialisation guard; Immutable.js objects would silently fail Next.js's RSC serialisation boundary.

### Why Not RTK Query?

RTK Query (`createApi`) is the idiomatic Redux Toolkit data-fetching solution but does not solve this codebase's SSR problem:

- **Store dependency**: RTK Query state lives in the Redux store. Hydrating it on the client requires serialising the entire store to JSON — incompatible with Immutable.js (`serializableCheck: false`).
- **Pages Router only**: RTK Query's SSR pattern uses `dispatch(endpoint.initiate(...))` + `getRunningQueriesThunk()` inside `getServerSideProps`. This does not translate to App Router RSC.
- **No first-class RSC integration**: As of RTK v2, there is no documented pattern for prefetching RTK Query data inside `async` Server Components and dehydrating it to client components.
- **Expands Redux surface**: Adopting RTK Query would deepen the Redux dependency rather than extracting WP content fetching from it.

The correct path is: keep RTK for `dvz-ui` chart/filter state (where it already works and has no SSR requirements), and use TanStack Query for WP content (where SSR is required).

### Why TanStack Query?

TanStack Query provides exactly what is needed:

- **`prefetchQuery` + `dehydrate` + `HydrationBoundary`** — the canonical App Router pattern; data fetched in RSC hydrates into client components without a second request.
- **Stale-while-revalidate** semantics matching ISR.
- **`useSuspenseQuery`** for React Suspense / streaming.
- No Redux dependency, no `window` references; safe to import on the server.

### Why `URLSearchParams` Instead of String Concatenation?

The current URL builders contain at least three bug classes:
1. Missing `&` separators between adjacent conditional segments.
2. `undefined` literals appearing verbatim in query strings.
3. Double-encoding of special character values.

`URLSearchParams` handles all three and produces RFC 3986-compliant query strings.

### Date Serialisation

WP REST API returns dates as ISO 8601 strings. The existing `Post` interface types them as `Date`, creating a mismatch with the wire format and making values unserialisable across the RSC boundary. `SerializablePost` retains them as `string`, matching the actual wire format and satisfying Next.js prop serialisation.

---

### Why dvz-ui Needs an SSR Adaptation Pass

The `wp-react-lib` API rewrite enables server-side WP data fetching, but `dvz-ui` components cannot benefit from it until the components themselves are safe to render on the server. The current state introduces three distinct classes of failure in an SSR environment:

1. **Render-time browser-global access** — `FlexWrapDetector` calls `deviceType()` (which reads `window.innerWidth` and `navigator.userAgent`) unconditionally at the top of its render function. In Node.js this throws `ReferenceError: window is not defined` before any output is produced.

2. **Hydration mismatches** — `useWindowDimensionsAndDevice` and `@artsy/fresnel` `Media` components produce different output depending on whether `window` is defined. Without a deterministic SSR default and the `mediaStyles` CSS injection, the server-rendered HTML and the first client render disagree on which breakpoint is active — React throws a hydration error and discards the server HTML entirely.

3. **Missing RSC/client boundary declarations** — `Layout.tsx` mounts a `useEffect` with `window.location.hash` access in the same file as the Redux `Provider` tree. Without a `'use client'` boundary, RSC-aware bundlers (Next.js App Router) either reject the file outright (if they parse the effect) or silently degrade the entire layout subtree to client-only rendering, defeating the purpose of SSR.

The `initialData` prop pattern solves a fourth problem: even with safe rendering, a container that unconditionally mounts `PageProvider` will trigger a client-side WP API fetch on every page load, undoing the latency benefit of server-prefetching. With `initialData`, the server pre-fills the content at build/request time and the client renders without any additional round-trip.

---

## 8. Dependencies & External Integrations

### External Systems

- **EXT-001**: WordPress REST API — primary data source. Namespaces: `wp/v2`, `dg/v1`, `menus/v1`. WPML plugin required for `lang` parameter support.
- **EXT-002**: WP-REST-API V2 Menus plugin — required for `/menus/v1/menus/`.

### Third-Party Services

- **SVC-001**: WPML — required for localised content routing via the `lang` query parameter.

### Infrastructure Dependencies

- **INF-001**: WordPress with ACF plugin — provides `acf` and `meta_fields` on posts/pages.

### Technology Platform Dependencies

- **PLT-001**: TypeScript with `"strict": true` in `tsconfig.json`.
- **PLT-002**: React 18+ — peer dependency; concurrent features and RSC required for the SSR tier.
- **PLT-003**: Node.js 18+ — required for native `fetch` and `crypto.randomUUID()` on the server.
- **PLT-004**: Next.js 13+ (App Router) **or** React Router v7 — the two supported SSR frameworks. The core library has no compile-time dependency on either.
- **PLT-005**: `@tanstack/react-query` v5 — optional peer dependency for the `./query` sub-path export.
- **PLT-006**: Redux + Immutable.js + `react-redux` — optional peer dependencies for the `./redux` sub-path only.

### dvz-ui SSR Platform Dependencies

- **PLT-007**: `@artsy/fresnel` — already a `dvz-ui` dependency. The SSR adaptation requires correct use of `MediaContextProvider` (server: all breakpoints; client: hydrated from `mediaStyles`). No version change required.
- **PLT-008**: `react-dom/server` (`renderToString` / `renderToPipeableStream`) — used in test assertions to validate server-render output. Available as part of the `react-dom` peer dependency already present in `dvz-ui`.
- **PLT-009**: Vitest — required for the new `dvz-ui` test suite. Already used in `wp-react-lib`; needs to be added to `dvz-ui` devDependencies if not present.

### Compliance Dependencies

- **COM-001**: No PII may be logged or cached by the API client. TanStack Query cache keys MUST NOT contain authentication tokens or session identifiers.

---

## 9. Examples & Edge Cases

```typescript
// ── Next.js App Router RSC ──────────────────────────────────────────────────
// app/publications/page.tsx  (no 'use client' — this is a Server Component)
import { createApiClient } from '@devgateway/wp-react-lib';
import { fetchPostsSsr } from '@devgateway/wp-react-lib/ssr';
import PublicationList from './PublicationList'; // 'use client' component

export default async function PublicationsPage() {
  const client = createApiClient(
    process.env.WP_API_URL,
    { next: { revalidate: 3600 } }  // ISR: revalidate every hour
  );
  const payload = await fetchPostsSsr(client, { locale: 'en', type: 'publication', perPage: 20 });
  // payload.posts is SerializablePost[] — ISO date strings, safe as RSC props
  return <PublicationList posts={payload.posts} total={payload.total} />;
}

// ── React Router v7 Loader ──────────────────────────────────────────────────
// routes/publications.tsx
import { createApiClient } from '@devgateway/wp-react-lib';
import type { Route } from './+types/publications';

export async function loader({ request }: Route.LoaderArgs) {
  const client = createApiClient(process.env.WP_API_URL);
  const { data: posts, meta } = await client.getPosts({ locale: 'en', type: 'publication', perPage: 20 });
  return { posts, total: Number(meta['x-wp-total']) };
}

export default function Publications() {
  const { posts, total } = useLoaderData<typeof loader>();
  // posts is Post[] — fully typed end-to-end via loader inference
}

// ── TanStack Query: RSC prefetch + client hydration ─────────────────────────
// app/layout.tsx (Server Component)
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { createApiClient } from '@devgateway/wp-react-lib';
import { postsQueryOptions } from '@devgateway/wp-react-lib/query';

export default async function RootLayout({ children }) {
  const queryClient = new QueryClient();
  const client = createApiClient(process.env.WP_API_URL);
  await queryClient.prefetchQuery(
    postsQueryOptions(client, { locale: 'en', type: 'posts', perPage: 10 })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

// PostList.tsx ('use client')
import { useQuery } from '@tanstack/react-query';
import { createApiClient, postsQueryOptions } from '@devgateway/wp-react-lib/query';

export function PostList() {
  const client = createApiClient('/wp/wp-json');
  const { data, isLoading } = useQuery(
    postsQueryOptions(client, { locale: 'en', type: 'posts', perPage: 10 })
  );
  // data is ApiResponse<Post[]> — hydrated from server, no extra network request
}

// ── Edge case: previewId bypasses slug/category filters ─────────────────────
// Produces: /wp/v2/post/42/revisions?_wpnonce=abc123&lang=en
// slug, categories, perPage are intentionally ignored when previewId is set.
const { data: revisions } = await client.getPosts({
  locale: 'en', type: 'post', previewId: '42', previewNonce: 'abc123',
});

// ── Edge case: draft preview — bypass Next.js data cache ────────────────────
const previewClient = createApiClient(process.env.WP_API_URL, { cache: 'no-store' });

// ── Edge case: multi-site — per-request apiBaseUrl override ─────────────────
const { data } = await client.getPosts({
  locale: 'fr', type: 'news', apiBaseUrl: 'https://fr.example.org/wp-json',
});

// ── dvz-ui: SlugContainer with server-prefetched data ────────────────────────
// app/[locale]/[slug]/page.tsx  (Next.js App Router RSC)
import { createApiClient } from '@devgateway/wp-react-lib';
import { fetchPostsSsr } from '@devgateway/wp-react-lib/ssr';
import { SlugContainer } from '@devgateway/dvz-ui-react/layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function SlugPage({ params }: { params: { locale: string; slug: string } }) {
  const client = createApiClient(process.env.WP_API_URL, { next: { revalidate: 3600 } });
  const { posts } = await fetchPostsSsr(client, { locale: params.locale, slug: params.slug });
  // posts is SerializablePost[] — safe to pass as RSC prop
  return (
    <SlugContainer
      header={<Header />}
      footer={<Footer />}
      initialData={posts}      // bypasses Redux PageProvider entirely
    />
  );
}

// ── dvz-ui: RootLayoutShell usage (Next.js App Router layout) ─────────────────
// app/[locale]/layout.tsx  (no 'use client')
import { RootLayoutShell } from '@devgateway/dvz-ui-react/layout';
import { ClientEffects } from '@devgateway/dvz-ui-react/layout';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <RootLayoutShell locale={params.locale}>
      <ClientEffects locale={params.locale} />
      {children}
    </RootLayoutShell>
  );
}

// ── dvz-ui: FlexWrapDetector — safe server render ────────────────────────────
// Because FlexWrapDetector is 'use client', it is never executed server-side.
// The SSR output for its parent will render the children without wrap detection
// (which is correct — layout measurement cannot happen on the server).

// ── dvz-ui: deviceType() — SSR-safe call ─────────────────────────────────────
import getDeviceType from '@devgateway/dvz-ui-react/utils';
// Server: returns 'desktop' (window is undefined)
// Client: returns the actual breakpoint based on window.innerWidth
const type = getDeviceType(); // always safe to call
```

---

## 10. Validation Criteria

- **VAL-001**: `pnpm --filter @devgateway/wp-react-lib exec tsc --noEmit --strict` exits with code `0`.
- **VAL-002**: `grep -r "any" packages/react-lib/wp-react-lib/src --include="*.ts" --include="*.tsx"` — all matches carry an `// INTEROP:` comment.
- **VAL-003**: `find packages/react-lib/wp-react-lib/src -name "*.js" -o -name "*.jsx"` returns zero results.
- **VAL-004**: `grep -r "console.log\|Math.random" packages/react-lib/wp-react-lib/src` returns zero results.
- **VAL-005**: `grep -rn "window\." packages/react-lib/wp-react-lib/src/api packages/react-lib/wp-react-lib/src/ssr` returns zero results.
- **VAL-006**: `grep -rn "from 'redux'" packages/react-lib/wp-react-lib/src/api packages/react-lib/wp-react-lib/src/ssr packages/react-lib/wp-react-lib/src/query` returns zero results.
- **VAL-007**: All unit and integration tests pass: `pnpm --filter @devgateway/wp-react-lib test`.
- **VAL-008**: `api/`, `ssr/`, and `query/` directories achieve 80% line coverage minimum.
- **VAL-009**: A minimal Next.js fixture app using `createApiClient()` inside an RSC builds via `next build` without errors.
- **VAL-010**: `JSON.stringify(await fetchPostsSsr(client, { locale: 'en' }))` completes without throwing.

### dvz-ui SSR Validation Criteria

- **VAL-011**: `grep -rn "window\.\|navigator\.\|document\." packages/dvz-ui/src --include="*.ts" --include="*.tsx"` — all matches are either inside a `useEffect` callback, or guarded by `typeof window !== 'undefined'`, or inside a file that has `'use client'` as its first line.
- **VAL-012**: `grep -rn "\.jsx\|\.js'" packages/dvz-ui/src --include="*.ts" --include="*.tsx"` (import statements) returns zero results.
- **VAL-013**: `pnpm --filter @devgateway/dvz-ui-react exec tsc --noEmit` exits with code `0`.
- **VAL-014**: `node -e "const { renderToString } = require('react-dom/server'); require('./RootLayoutShell-test');"` (a minimal fixture) completes without `ReferenceError` related to `window` or `navigator`.
- **VAL-015**: `pnpm --filter @devgateway/dvz-ui-react test` passes with zero failures.

---

## 11. Headless CMS Migration Options

If the team considers migrating off WordPress, the following platforms are strong candidates. All support WP data export and provide REST/GraphQL APIs with TypeScript SDKs that are compatible with the `createApiClient` pattern defined in this spec.

| Criterion | WordPress | Payload CMS | Strapi | Sanity | Directus |
|-----------|-----------|-------------|--------|--------|----------|
| TypeScript-first | No | Yes | Yes (v4+) | Yes | Yes |
| Self-hosted | Yes | Yes | Yes | Cloud | Yes |
| REST API | Yes | Yes | Yes | No (GROQ) | Yes |
| GraphQL | Via plugin | Yes | Yes | Yes | Yes |
| i18n | WPML (paid) | Built-in | Built-in | Built-in | Built-in |
| App Router RSC | Needs adapter | Yes | Yes | Yes | Yes |
| WP migration path | N/A | Script | Plugin | Script | Direct DB |

**Payload CMS** is the recommended option for a self-hosted, TypeScript-first migration: schemas are TypeScript config files, types are auto-generated, and the REST API shape is mappable to the existing `Post`/`WpCategory` interfaces with an adapter layer over `createApiClient`. **Directus** is the lowest-friction option if WP MySQL data is to be reused directly.

---

## 12. Related Specifications / Further Reading

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Next.js App Router — Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js `fetch` caching and revalidation](https://nextjs.org/docs/app/api-reference/functions/fetch)
- [React Router v7 — Data Loading (Loaders)](https://reactrouter.com/start/framework/data-loading)
- [TanStack Query v5 — Advanced SSR](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr)
- [TanStack Query v5 — prefetchQuery + HydrationBoundary](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#full-router-integration)
- [RTK Query SSR (Pages Router only)](https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [MSW v2](https://mswjs.io/)
- [Payload CMS](https://payloadcms.com/docs)
- [Strapi](https://docs.strapi.io/)
- [Sanity](https://www.sanity.io/docs)
- [Directus](https://docs.directus.io/)
