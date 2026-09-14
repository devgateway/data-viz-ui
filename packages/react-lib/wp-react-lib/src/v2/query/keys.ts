import type { GetCategoriesParams, GetPagesParams, GetPostsParams, SearchParams } from '../client/WPClient';

/**
 * Central query-key registry. Every key is prefixed `['wp', ...]` so
 * `queryClient.invalidateQueries({ queryKey: wpQueryKeys.all })` invalidates
 * everything this adapter fetched, and `['wp', 'posts']` invalidates every
 * `usePosts` query regardless of params (TanStack Query matches key arrays
 * by prefix). Exported standalone (not just inside the hooks) so a route
 * loader can build the exact same key for `queryClient.prefetchQuery`
 * without needing to call a hook.
 */
export const wpQueryKeys = {
    all: ['wp'] as const,
    posts: (params: GetPostsParams = {}) => [...wpQueryKeys.all, 'posts', params] as const,
    pages: (params: GetPagesParams = {}) => [...wpQueryKeys.all, 'pages', params] as const,
    media: (slug: string, locale?: string) => [...wpQueryKeys.all, 'media', slug, locale] as const,
    menu: (name: string, locale?: string) => [...wpQueryKeys.all, 'menu', name, locale] as const,
    categories: (params: GetCategoriesParams = {}) => [...wpQueryKeys.all, 'categories', params] as const,
    taxonomy: (name: string, locale?: string) => [...wpQueryKeys.all, 'taxonomy', name, locale] as const,
    search: (params: SearchParams = {}) => [...wpQueryKeys.all, 'search', params] as const,
    settings: (locale?: string, changesetUuid?: string) => [...wpQueryKeys.all, 'settings', locale, changesetUuid] as const,
};
