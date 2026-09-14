import { joinUrl, randomCacheBust, resolveBaseUrl, withQuery } from './url';
import { request } from './request';
import type { WPClientConfig, WPResponse, WPTerm } from './types';
import type { Post } from '../../post-type';
import type { DgSettings, Media, SearchResult } from '../../types';

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export interface GetPostsParams {
    type?: string;
    slug?: string;
    taxonomy?: string;
    categories?: string;
    before?: Date | string;
    after?: Date | string;
    perPage?: number;
    page?: number;
    fields?: string;
    locale?: string;
    search?: string;
    previewId?: string;
    previewNonce?: string;
}

export interface GetPagesParams {
    slug?: string;
    parent?: string;
    before?: Date | string;
    perPage?: number;
    page?: number;
    fields?: string;
    locale?: string;
    search?: string;
    previewId?: string;
    previewNonce?: string;
    noCache?: boolean;
}

export interface GetCategoriesParams {
    context?: string;
    page?: number;
    perPage?: number;
    search?: string;
    exclude?: string;
    include?: string;
    order?: string;
    orderby?: string;
    hideEmpty?: boolean;
    parent?: string;
    post?: string;
    slug?: string;
    locale?: string;
}

export interface SearchParams {
    context?: string;
    page?: number;
    perPage?: number;
    search?: string;
    type?: string;
    subtype?: string;
    locale?: string;
}

/**
 * Typed WordPress REST API client. Create with `createWordPressClient()`.
 * baseUrl resolution (absolute vs. relative) happens per-call, so building a
 * client during SSR for a component that never fetches is not an error -
 * only calling a method with an unresolvable relative baseUrl is.
 */
export class WPClient {
    readonly config: Readonly<WPClientConfig>;

    constructor(config: WPClientConfig) {
        this.config = { ...config };
    }

    private buildUrl(path: string, params?: Record<string, unknown>): string {
        const base = resolveBaseUrl(this.config.baseUrl, this.config.origin);
        return withQuery(joinUrl(base, path), params);
    }

    private buildHeaders(overrides?: Record<string, string>): Record<string, string> {
        return { ...DEFAULT_HEADERS, ...this.config.headers, ...overrides };
    }

    // Declared `async` so that a synchronous throw from resolveBaseUrl() (a
    // relative baseUrl during SSR) always surfaces as a rejected promise,
    // never a synchronous throw - callers can uniformly `await`/`.catch()`.
    private async get<T>(path: string, params?: Record<string, unknown>): Promise<WPResponse<T>> {
        return request<T>(this.buildUrl(path, params), {
            headers: this.buildHeaders(),
            timeout: this.config.timeout,
            fetch: this.config.fetch,
            credentials: 'include',
        });
    }

    getPosts(params: GetPostsParams = {}): Promise<WPResponse<Post[]>> {
        const { type = 'posts', slug, taxonomy, categories, before, after, perPage, page, fields, locale, search, previewId, previewNonce } = params;

        if (previewId) {
            return this.get<Post[]>(`/wp/v2/${type}/${previewId}/revisions`, { _wpnonce: previewNonce });
        }

        const query: Record<string, unknown> = { lang: locale, slug };
        if (!slug) {
            if (categories) {
                query[taxonomy || 'categories'] = categories;
            }
            Object.assign(query, { per_page: perPage, page, _fields: fields, search, before, after });
        }

        return this.get<Post[]>(`/wp/v2/${type}`, query);
    }

    getPages(params: GetPagesParams = {}): Promise<WPResponse<Post[]>> {
        const { slug, parent, before, perPage, page, fields, locale, search, previewId, previewNonce, noCache } = params;

        if (previewId) {
            return this.get<Post[]>(`/wp/v2/pages/${previewId}/revisions`, { _wpnonce: previewNonce });
        }

        const query: Record<string, unknown> = { lang: locale, slug };
        if (!slug) {
            Object.assign(query, {
                before,
                per_page: perPage,
                page,
                _fields: fields,
                parent,
                search,
                cacheBust: noCache ? randomCacheBust() : undefined,
            });
        }

        return this.get<Post[]>('/wp/v2/pages', query);
    }

    getMedia(slug: string, locale?: string): Promise<WPResponse<Media>> {
        return this.get<Media>(`/wp/v2/media/${slug}`, { lang: locale });
    }

    getSettings(locale?: string, changesetUuid?: string): Promise<WPResponse<DgSettings>> {
        return this.get<DgSettings>('/dg/v1/settings', {
            cacheBust: randomCacheBust(),
            lang: locale,
            customize_changeset_uuid: changesetUuid,
        });
    }

    /** WP Menus plugin response shape is plugin-specific; type it at the call site. */
    getMenu<T = unknown>(name: string, locale?: string): Promise<WPResponse<T>> {
        return this.get<T>(`/menus/v1/menus/${name}`, { lang: locale });
    }

    getCategories(params: GetCategoriesParams = {}): Promise<WPResponse<WPTerm[]>> {
        const { context = 'view', page = 1, perPage = 10, search, exclude, include, order = 'asc', orderby = 'name', hideEmpty, parent, post, slug, locale } = params;

        return this.get<WPTerm[]>('/wp/v2/categories', {
            lang: locale,
            context,
            page,
            per_page: perPage,
            search,
            exclude,
            include,
            order,
            orderby,
            hide_empty: hideEmpty,
            parent,
            post,
            slug,
        });
    }

    /** Returns the terms of an arbitrary taxonomy (e.g. "categories", "tags"); type it at the call site. */
    getTaxonomy<T = WPTerm[]>(name: string, locale?: string): Promise<WPResponse<T>> {
        return this.get<T>(`/wp/v2/${name}`, { lang: locale, per_page: 100 });
    }

    search(params: SearchParams = {}): Promise<WPResponse<SearchResult[]>> {
        const { context, page, perPage, search, type, subtype, locale } = params;

        return this.get<SearchResult[]>('/dg/v1/search', {
            lang: locale,
            context,
            per_page: perPage,
            page,
            search,
            type,
            subtype,
        });
    }

    /** Custom `util-api/v1/year-range` endpoint; response shape is deployment-specific. */
    getYearRange<T = unknown>(): Promise<WPResponse<T>> {
        return this.get<T>('/util-api/v1/year-range');
    }
}

export const createWordPressClient = (config: WPClientConfig): WPClient => new WPClient(config);
