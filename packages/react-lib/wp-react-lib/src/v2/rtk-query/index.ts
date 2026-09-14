export { wpApi } from './wpApi';
export type { WPQueryError } from './wpApi';
export {
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
} from './wpApi';

export type { WPClient, GetPostsParams, GetPagesParams, GetCategoriesParams, SearchParams } from '../client/WPClient';
export type { WPClientConfig, ResponseMeta, WPResponse, WPTerm } from '../client/types';
export { WPConfigError, WPApiError, WPTimeoutError } from '../client/errors';
export { createWordPressClient } from '../client/WPClient';
