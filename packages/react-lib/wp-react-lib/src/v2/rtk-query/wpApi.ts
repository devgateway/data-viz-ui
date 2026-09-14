import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GetCategoriesParams, GetPagesParams, GetPostsParams, SearchParams, WPClient } from '../client/WPClient';
import type { ResponseMeta, WPResponse, WPTerm } from '../client/types';
import { WPApiError } from '../client/errors';
import type { Post } from '../../post-type';
import type { DgSettings, Media, SearchResult } from '../../types';

/**
 * `queryFn`s below never read a module-level client - they read
 * `queryApi.extra` instead, so the same `wpApi` slice works against
 * whichever `WPClient` the consuming app supplies (a different one per
 * environment, per WP site, or - on the server - per request). Register
 * this by giving `configureStore` a `WPClient` as its thunk extra argument:
 *
 * ```ts
 * configureStore({
 *   reducer: { [wpApi.reducerPath]: wpApi.reducer, ... },
 *   middleware: (getDefaultMiddleware) =>
 *     getDefaultMiddleware({ thunk: { extraArgument: wpClient } }).concat(wpApi.middleware),
 * });
 * ```
 *
 * `baseQuery: fakeBaseQuery()` because there's no single base query here -
 * every endpoint's `queryFn` calls a different `WPClient` method directly.
 */
const getClient = (extra: unknown): WPClient => extra as WPClient;

/**
 * RTK Query's store keeps every query's `error` in Redux state, which its
 * `serializableCheck` middleware (on by default) flags if it's a class
 * instance rather than a plain object - `WPApiError`/`WPConfigError` are
 * both classes, so they're converted to a plain, serializable shape here
 * (mirroring RTK Query's own `FetchBaseQueryError` convention) rather than
 * stored as-is.
 */
export interface WPQueryError {
    name: string;
    message: string;
    status?: number;
    url?: string;
    body?: unknown;
}

const toQueryError = (error: unknown): { error: WPQueryError } => {
    if (error instanceof WPApiError) {
        return { error: { name: error.name, message: error.message, status: error.status, url: error.url, body: error.body } };
    }
    const message = error instanceof Error ? error.message : String(error);
    return { error: { name: error instanceof Error ? error.name : 'WPApiError', message } };
};

export const wpApi = createApi({
    reducerPath: 'wpApi',
    baseQuery: fakeBaseQuery<WPQueryError>(),
    endpoints: (builder) => ({
        getPosts: builder.query<WPResponse<Post[]>, GetPostsParams | void>({
            queryFn: async (params, queryApi) => {
                try {
                    return { data: await getClient(queryApi.extra).getPosts(params ?? {}) };
                } catch (error) {
                    return toQueryError(error);
                }
            },
        }),
        getPages: builder.query<WPResponse<Post[]>, GetPagesParams | void>({
            queryFn: async (params, queryApi) => {
                try {
                    return { data: await getClient(queryApi.extra).getPages(params ?? {}) };
                } catch (error) {
                    return toQueryError(error);
                }
            },
        }),
        getMedia: builder.query<WPResponse<Media>, { slug: string; locale?: string }>({
            queryFn: async ({ slug, locale }, queryApi) => {
                try {
                    return { data: await getClient(queryApi.extra).getMedia(slug, locale) };
                } catch (error) {
                    return toQueryError(error);
                }
            },
        }),
        getMenu: builder.query<WPResponse<unknown>, { name: string; locale?: string }>({
            queryFn: async ({ name, locale }, queryApi) => {
                try {
                    return { data: await getClient(queryApi.extra).getMenu(name, locale) };
                } catch (error) {
                    return toQueryError(error);
                }
            },
        }),
        getCategories: builder.query<WPResponse<WPTerm[]>, GetCategoriesParams | void>({
            queryFn: async (params, queryApi) => {
                try {
                    return { data: await getClient(queryApi.extra).getCategories(params ?? {}) };
                } catch (error) {
                    return toQueryError(error);
                }
            },
        }),
        getTaxonomy: builder.query<WPResponse<WPTerm[]>, { name: string; locale?: string }>({
            queryFn: async ({ name, locale }, queryApi) => {
                try {
                    return { data: await getClient(queryApi.extra).getTaxonomy(name, locale) };
                } catch (error) {
                    return toQueryError(error);
                }
            },
        }),
        search: builder.query<WPResponse<SearchResult[]>, SearchParams | void>({
            queryFn: async (params, queryApi) => {
                try {
                    return { data: await getClient(queryApi.extra).search(params ?? {}) };
                } catch (error) {
                    return toQueryError(error);
                }
            },
        }),
        getSettings: builder.query<WPResponse<DgSettings>, { locale?: string; changesetUuid?: string } | void>({
            queryFn: async (params, queryApi) => {
                try {
                    return { data: await getClient(queryApi.extra).getSettings(params?.locale, params?.changesetUuid) };
                } catch (error) {
                    return toQueryError(error);
                }
            },
        }),
        getYearRange: builder.query<WPResponse<unknown>, void>({
            queryFn: async (_arg, queryApi) => {
                try {
                    return { data: await getClient(queryApi.extra).getYearRange() };
                } catch (error) {
                    return toQueryError(error);
                }
            },
        }),
    }),
});

export const {
    useGetPostsQuery,
    useLazyGetPostsQuery,
    useGetPagesQuery,
    useLazyGetPagesQuery,
    useGetMediaQuery,
    useLazyGetMediaQuery,
    useGetMenuQuery,
    useLazyGetMenuQuery,
    useGetCategoriesQuery,
    useLazyGetCategoriesQuery,
    useGetTaxonomyQuery,
    useLazyGetTaxonomyQuery,
    useSearchQuery,
    useLazySearchQuery,
    useGetSettingsQuery,
    useLazyGetSettingsQuery,
    useGetYearRangeQuery,
    useLazyGetYearRangeQuery,
} = wpApi;

export type { ResponseMeta };
