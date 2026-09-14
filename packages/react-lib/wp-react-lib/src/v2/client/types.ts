export interface WPClientConfig {
    /**
     * Absolute (e.g. "https://example.com/wp"), or relative (e.g. "/wp") -
     * relative works in the browser as-is, and on the server if `origin` is
     * also provided (otherwise a relative baseUrl throws when something
     * actually fetches during SSR - there's nothing to resolve it against).
     */
    baseUrl: string;
    /**
     * Used only to resolve a relative `baseUrl` when there's no `window`
     * (i.e. during SSR). Typically the incoming request's origin (e.g.
     * `new URL(request.url).origin` in a loader), or an internal address
     * (e.g. "http://wordpress:8080") if SSR requests should bypass the
     * public-facing proxy entirely. Ignored when `baseUrl` is absolute, and
     * ignored in the browser (a relative baseUrl already resolves against
     * the page's own origin there).
     */
    origin?: string;
    locale?: string;
    /** Request timeout in ms, enforced via AbortController. */
    timeout?: number;
    /** Merged into every request; per-call headers take precedence. */
    headers?: Record<string, string>;
    /** Injectable fetch implementation, defaults to global fetch. */
    fetch?: typeof fetch;
}

export interface ResponseMeta {
    total?: number;
    totalPages?: number;
    link?: string;
    contentType?: string;
}

export interface WPResponse<T> {
    data: T;
    meta: ResponseMeta;
}

/** Shape shared by WP core taxonomy terms (categories, tags, and other custom taxonomies). */
export interface WPTerm {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent?: number;
    meta?: Record<string, unknown>;
    _links?: Record<string, unknown>;
}
