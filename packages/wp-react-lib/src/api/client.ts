import type { Post } from '../post-type';
import type { DgSettings, Media, SearchResults, Taxonomy, WpCategory, ApiResponse } from '../types';
import {
    getPosts,
    getPages,
    getMenu,
    getSettings,
    getMedia,
    getCategories,
    getTaxonomy,
    getYearRange,
    search,
    getPostsByTypeAndTaxonomy,
} from './index';
import type {
    GetPostsParams,
    GetPagesParams,
    GetMenuParams,
    GetSettingsParams,
    GetMediaParams,
    GetCategoriesParams,
    GetTaxonomyParams,
    SearchParams,
    GetPostsByTaxonomyParams,
    BaseApiParams,
    YearRange,
    MenuItem,
} from './index';

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

// Extend ImportMeta so we can read Vite env without @ts-ignore.
type ViteImportMeta = ImportMeta & { env?: Record<string, string | undefined> };

export function createApiClient(baseUrl?: string, defaultFetchOptions?: RequestInit): WpApiClient {
    const apiBase = baseUrl ?? (
        (import.meta as ViteImportMeta).env?.VITE_REACT_APP_WP_API ??
        process.env['VITE_REACT_APP_WP_API'] ??
        '/wp/wp-json'
    );

    function mergeOptions(params: BaseApiParams): { apiBaseUrl: string; fetchOptions: RequestInit | undefined } {
        return {
            apiBaseUrl: params.apiBaseUrl ?? apiBase,
            fetchOptions: defaultFetchOptions
                ? { ...defaultFetchOptions, ...params.fetchOptions }
                : params.fetchOptions,
        };
    }

    return {
        getPosts:                 (p) => getPosts({ ...p, ...mergeOptions(p) }),
        getPages:                 (p) => getPages({ ...p, ...mergeOptions(p) }),
        getMenu:                  (p) => getMenu({ ...p, ...mergeOptions(p) }),
        getSettings:              (p) => getSettings({ ...p, ...mergeOptions(p) }),
        getMedia:                 (p) => getMedia({ ...p, ...mergeOptions(p) }),
        getCategories:            (p) => getCategories({ ...p, ...mergeOptions(p) }),
        getTaxonomy:              (p) => getTaxonomy({ ...p, ...mergeOptions(p) }),
        getYearRange:             (p) => getYearRange({ ...p ?? {}, ...mergeOptions(p ?? {}) }),
        search:                   (p) => search({ ...p, ...mergeOptions(p) }),
        getPostsByTypeAndTaxonomy:(p) => getPostsByTypeAndTaxonomy({ ...p, ...mergeOptions(p) }),
    };
}
