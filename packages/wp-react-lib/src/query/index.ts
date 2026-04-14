/**
 * TanStack Query helpers for wp-react-lib.
 * These helpers enable prefetchQuery in RSC and useQuery in client components
 * to share the same cache key, enabling zero-cost hydration.
 *
 * @module @devgateway/wp-react-lib/query
 *
 * @example
 * // Server Component (RSC)
 * const queryClient = new QueryClient();
 * await queryClient.prefetchQuery(postsQueryOptions(client, { locale: 'en', perPage: 10 }));
 *
 * // Client Component
 * const { data } = useQuery(postsQueryOptions(client, { locale: 'en', perPage: 10 }));
 * // data hydrated from server — no extra network request
 */

import type { WpApiClient } from '../api/client';
import type {
    GetPostsParams,
    GetPagesParams,
    GetSettingsParams,
    GetCategoriesParams,
    GetMenuParams,
    GetMediaParams,
    SearchParams,
    GetTaxonomyParams,
    ApiResponse,
} from '../api/index';
import type { Post } from '../post-type';
import type { DgSettings, Media, SearchResults, Taxonomy, WpCategory, Menu as MenuItem } from '../types';

// Stable, serialisable cache key factories.
export const wpQueryKeys = {
    posts:      (params: GetPostsParams)      => ['wp', 'posts',      params] as const,
    pages:      (params: GetPagesParams)      => ['wp', 'pages',      params] as const,
    settings:   (params: GetSettingsParams)   => ['wp', 'settings',   params] as const,
    categories: (params: GetCategoriesParams) => ['wp', 'categories', params] as const,
    menu:       (params: GetMenuParams)       => ['wp', 'menu',       params] as const,
    media:      (params: GetMediaParams)      => ['wp', 'media',      params] as const,
    search:     (params: SearchParams)        => ['wp', 'search',     params] as const,
    taxonomy:   (params: GetTaxonomyParams)   => ['wp', 'taxonomy',   params] as const,
} as const;

// Note: QueryOptions type is from @tanstack/react-query.
// We use a generic shape here to avoid hard dependency on the package in this file.
// Callers with @tanstack/react-query installed will get full type inference.
type QueryOptions<TData> = {
    queryKey: readonly unknown[];
    queryFn: () => Promise<TData>;
};

export function postsQueryOptions(client: WpApiClient, params: GetPostsParams): QueryOptions<ApiResponse<Post[]>> {
    return { queryKey: wpQueryKeys.posts(params), queryFn: () => client.getPosts(params) };
}

export function pagesQueryOptions(client: WpApiClient, params: GetPagesParams): QueryOptions<ApiResponse<Post[]>> {
    return { queryKey: wpQueryKeys.pages(params), queryFn: () => client.getPages(params) };
}

export function settingsQueryOptions(client: WpApiClient, params: GetSettingsParams): QueryOptions<ApiResponse<DgSettings>> {
    return { queryKey: wpQueryKeys.settings(params), queryFn: () => client.getSettings(params) };
}

export function categoriesQueryOptions(client: WpApiClient, params: GetCategoriesParams): QueryOptions<ApiResponse<WpCategory[]>> {
    return { queryKey: wpQueryKeys.categories(params), queryFn: () => client.getCategories(params) };
}

export function menuQueryOptions(client: WpApiClient, params: GetMenuParams): QueryOptions<ApiResponse<MenuItem[]>> {
    return { queryKey: wpQueryKeys.menu(params), queryFn: () => client.getMenu(params) };
}

export function mediaQueryOptions(client: WpApiClient, params: GetMediaParams): QueryOptions<ApiResponse<Media>> {
    return { queryKey: wpQueryKeys.media(params), queryFn: () => client.getMedia(params) };
}

export function searchQueryOptions(client: WpApiClient, params: SearchParams): QueryOptions<ApiResponse<SearchResults>> {
    return { queryKey: wpQueryKeys.search(params), queryFn: () => client.search(params) };
}

export function taxonomyQueryOptions(client: WpApiClient, params: GetTaxonomyParams): QueryOptions<ApiResponse<Taxonomy[]>> {
    return { queryKey: wpQueryKeys.taxonomy(params), queryFn: () => client.getTaxonomy(params) };
}
