import type { Post } from '../post-type';
import type { DgSettings, Media, SearchResults, Taxonomy, WpCategory, Menu, ApiError, ApiResponse } from '../types';

// Extend ImportMeta so we can read Vite env without @ts-ignore.
type ViteImportMeta = ImportMeta & { env?: Record<string, string | undefined> };

const API_ROOT: string =
    (import.meta as ViteImportMeta).env?.VITE_REACT_APP_WP_API ??
    process.env['VITE_REACT_APP_WP_API'] ??
    '/wp/wp-json';

// 1. Re-export ApiError and ApiResponse so api/index is the single import point.
export type { ApiError, ApiResponse } from '../types';

export interface BaseApiParams {
    apiBaseUrl?: string;
    fetchOptions?: RequestInit;
}

export interface LocalisedParams extends BaseApiParams {
    locale: string;
}

export interface GetPostsParams extends LocalisedParams {
    slug?: string;
    type?: string;
    taxonomy?: string;
    categories?: string | string[];
    before?: Date | string;
    after?: Date | string;
    perPage?: number;
    page?: number;
    fields?: string[];
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
    orderby?: 'id' | 'include' | 'name' | 'slug' | 'include_slugs' | 'term_group' | 'description' | 'count';
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

export interface YearRange {
    min: number;
    max: number;
}

export type MenuItem = Menu;

// ---------------------------------------------------------------------------
// Transport layer
// ---------------------------------------------------------------------------

function collectHeaders(headers: Headers): Record<string, string> {
    const meta: Record<string, string> = {};
    headers.forEach((value, name) => { meta[name] = value; });
    return meta;
}

export async function get<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(url, { credentials: 'include', ...options });
    if (!response.ok) {
        const err: ApiError = { status: response.status, statusText: response.statusText, url };
        throw err;
    }
    const data = await response.json() as T;
    return { data, meta: collectHeaders(response.headers) };
}

export async function post<TBody, TResponse>(
    url: string,
    body: TBody,
    options?: RequestInit & { isBlob?: boolean }
): Promise<ApiResponse<TResponse>> {
    const { isBlob, ...fetchOptions } = options ?? {};
    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body),
        ...fetchOptions,
    });
    if (!response.ok) {
        const err: ApiError = { status: response.status, statusText: response.statusText, url };
        throw err;
    }
    const meta = collectHeaders(response.headers);
    if (isBlob) {
        const data = await response.blob() as unknown as TResponse;
        return { data, meta };
    }
    const data = await response.json() as TResponse;
    return { data, meta };
}

// ---------------------------------------------------------------------------
// Endpoint helpers
// ---------------------------------------------------------------------------

export function getTaxonomy(params: GetTaxonomyParams): Promise<ApiResponse<Taxonomy[]>> {
    const { name, locale, apiBaseUrl, fetchOptions } = params;
    const base = apiBaseUrl ?? API_ROOT;
    const qp = new URLSearchParams();
    qp.set('lang', locale);
    qp.set('per_page', '100');
    return get<Taxonomy[]>(`${base}/wp/v2/${name}?${qp.toString()}`, fetchOptions);
}

export function getPostsByTypeAndTaxonomy(params: GetPostsByTaxonomyParams): Promise<ApiResponse<Post[]>> {
    const { type, category, value, locale, page = 1, perPage = 1, apiBaseUrl, fetchOptions } = params;
    const base = apiBaseUrl ?? API_ROOT;
    const qp = new URLSearchParams();
    qp.set('_embed', '1');
    qp.set(category, value);
    qp.set('lang', locale);
    qp.set('per_page', String(perPage));
    qp.set('page', String(page));
    return get<Post[]>(`${base}/wp/v2/${type}?${qp.toString()}`, fetchOptions);
}

export function getSettings(params: GetSettingsParams): Promise<ApiResponse<DgSettings>> {
    const { locale, changeUUID, apiBaseUrl, fetchOptions } = params;
    const base = apiBaseUrl ?? API_ROOT;
    const qp = new URLSearchParams();
    qp.set('cacheBust', Date.now().toString());
    qp.set('lang', locale);
    if (changeUUID) qp.set('customize_changeset_uuid', changeUUID);
    return get<DgSettings>(`${base}/dg/v1/settings?${qp.toString()}`, fetchOptions);
}

export function getMenu(params: GetMenuParams): Promise<ApiResponse<MenuItem[]>> {
    const { name, locale, apiBaseUrl, fetchOptions } = params;
    const base = apiBaseUrl ?? API_ROOT;
    const qp = new URLSearchParams();
    qp.set('lang', locale);
    return get<MenuItem[]>(`${base}/menus/v1/menus/${name}?${qp.toString()}`, fetchOptions);
}

export function getPosts(params: GetPostsParams): Promise<ApiResponse<Post[]>> {
    const {
        slug, type, taxonomy, categories, before, after,
        perPage, page, fields, locale, previewNonce, previewId, search,
        apiBaseUrl, fetchOptions,
    } = params;
    const base = apiBaseUrl ?? API_ROOT;

    if (previewId) {
        const qp = new URLSearchParams();
        qp.set('_wpnonce', previewNonce ?? '');
        qp.set('lang', locale);
        return get<Post[]>(`${base}/wp/v2/${type ?? 'posts'}/${previewId}/revisions?${qp.toString()}`, fetchOptions);
    }

    const qp = new URLSearchParams();
    qp.set('lang', locale);
    if (slug) {
        qp.set('slug', slug);
    } else {
        if (categories) {
            const catValue = Array.isArray(categories) ? categories.join(',') : categories;
            qp.set(taxonomy ?? 'categories', catValue);
        }
        if (perPage !== undefined) qp.set('per_page', String(perPage));
        if (page !== undefined) qp.set('page', String(page));
        if (fields && fields.length > 0) qp.set('_fields', fields.join(','));
        if (search) qp.set('search', search);
        if (before !== undefined) {
            qp.set('before', before instanceof Date ? before.toISOString() : before);
        }
        if (after !== undefined) {
            qp.set('after', after instanceof Date ? after.toISOString() : after);
        }
    }
    return get<Post[]>(`${base}/wp/v2/${type ?? 'posts'}?${qp.toString()}`, fetchOptions);
}

export function getPages(params: GetPagesParams): Promise<ApiResponse<Post[]>> {
    const {
        slug, parent, before, perPage, page, fields, locale,
        previewNonce, previewId, search, noCache, apiBaseUrl, fetchOptions,
    } = params;
    const base = apiBaseUrl ?? API_ROOT;

    if (previewId) {
        const qp = new URLSearchParams();
        qp.set('_wpnonce', previewNonce ?? '');
        qp.set('lang', locale);
        return get<Post[]>(`${base}/wp/v2/pages/${previewId}/revisions?${qp.toString()}`, fetchOptions);
    }

    const qp = new URLSearchParams();
    qp.set('lang', locale);
    if (slug) {
        qp.set('slug', slug);
    } else {
        if (before) qp.set('before', before.toISOString());
        if (perPage !== undefined) qp.set('per_page', String(perPage));
        if (page !== undefined) qp.set('page', String(page));
        if (fields && fields.length > 0) qp.set('_fields', fields.join(','));
        if (parent) qp.set('parent', parent);
        if (search) qp.set('search', search);
        if (noCache) qp.set('cacheBust', Date.now().toString());
    }
    return get<Post[]>(`${base}/wp/v2/pages?${qp.toString()}`, fetchOptions);
}

export function getMedia(params: GetMediaParams): Promise<ApiResponse<Media>> {
    const { slug, locale, apiBaseUrl, fetchOptions } = params;
    const base = apiBaseUrl ?? API_ROOT;
    const qp = new URLSearchParams();
    qp.set('lang', locale);
    return get<Media>(`${base}/wp/v2/media/${slug}?${qp.toString()}`, fetchOptions);
}

export function getCategories(params: GetCategoriesParams): Promise<ApiResponse<WpCategory[]>> {
    const {
        context = 'view', page = 1, perPage = 10, search, exclude, include,
        order = 'asc', orderby = 'name', hideEmpty, parent, post, slug, locale,
        apiBaseUrl, fetchOptions,
    } = params;
    const base = apiBaseUrl ?? API_ROOT;
    const qp = new URLSearchParams();
    qp.set('lang', locale);
    qp.set('context', context);
    qp.set('page', String(page));
    qp.set('per_page', String(perPage));
    if (search) qp.set('search', search);
    if (exclude) qp.set('exclude', exclude);
    if (include) qp.set('include', include);
    qp.set('order', order);
    qp.set('orderby', orderby);
    if (hideEmpty !== undefined) qp.set('hide_empty', String(hideEmpty));
    if (parent) qp.set('parent', parent);
    if (post) qp.set('post', post);
    if (slug) qp.set('slug', slug);
    return get<WpCategory[]>(`${base}/wp/v2/categories?${qp.toString()}`, fetchOptions);
}

export function search(params: SearchParams): Promise<ApiResponse<SearchResults>> {
    const {
        context, page, perPage, search: searchTerm, type, subtype, locale,
        apiBaseUrl, fetchOptions,
    } = params;
    const base = apiBaseUrl ?? API_ROOT;
    const qp = new URLSearchParams();
    qp.set('lang', locale);
    if (context) qp.set('context', context);
    if (perPage !== undefined) qp.set('per_page', String(perPage));
    if (page !== undefined) qp.set('page', String(page));
    if (searchTerm) qp.set('search', searchTerm);
    if (type) qp.set('type', type);
    if (subtype) qp.set('subtype', subtype);
    return get<SearchResults>(`${base}/dg/v1/search?${qp.toString()}`, fetchOptions);
}

export function getYearRange(params?: BaseApiParams): Promise<ApiResponse<YearRange>> {
    const base = params?.apiBaseUrl ?? API_ROOT;
    return get<YearRange>(`${base}/util-api/v1/year-range`, params?.fetchOptions);
}
