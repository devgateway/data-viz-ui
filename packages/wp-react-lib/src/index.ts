// Core types
export type { PostType, PageMetaResponse, PageResponse } from './post-type';
// Post is exported as a component value below; PostType is its type alias
export type { Post as PostInterface } from './post-type';
export type {
    GetPostsParams, GetPagesParams, GetCategoriesParams,
    GetMenuParams, GetSettingsParams, GetMediaParams,
    GetTaxonomyParams, SearchParams, GetPostsByTaxonomyParams,
    BaseApiParams, LocalisedParams, YearRange, MenuItem,
    // Re-exported from types for convenience via api/index:
    ApiResponse, ApiError,
} from './api/index';
// API functions (direct SSR-safe fetch calls, no Redux)
export {
    getPosts, getPages, getSettings, getMenu,
    getMedia, getCategories, search, getYearRange,
    getTaxonomy, getPostsByTypeAndTaxonomy,
} from './api/index';
export type { WpApiClient } from './api/client';
export { createApiClient } from './api/client';

// SSR helpers
export type { SerializablePost, PostsPayload, PagePayload } from './ssr/index';
export { fetchPostsSsr, fetchPageSsr, fetchSettingsSsr } from './ssr/index';

// Providers
export { default as AppContextProvider } from './providers/AppContextProvider';
export { default as MenuProvider } from './providers/MenuProvider';
export { default as PostProvider } from './providers/PostProvider';
export { default as PageProvider } from './providers/PageProvider';
export { default as SettingProvider } from './providers/SettingProvider';
export { default as SearchProvider } from './providers/SearchProvider';
export { default as TaxonomyProvider } from './providers/TaxonomyProvider';
export { default as MediaProvider } from './providers/MediaProvider';
export { default as CategoriesProvider } from './providers/CategoriesProvider';
export { default as LocalizedProvider } from './providers/LocalizedProvider';

// Consumers
export { default as PageConsumer } from './consumers/PageConsumer';
export { default as PostConsumer } from './consumers/PostConsumer';
export { default as MenuConsumer } from './consumers/MenuConsumer';
export { default as SettingsConsumer } from './consumers/SettingsConsumer';
export { default as CategoriesConsumer } from './consumers/CategoriesConsumer';
export { default as MediaConsumer } from './consumers/MediaConsumer';
export { default as SearchConsumer } from './consumers/SearchConsumer';
export { default as TaxonomyConsumer } from './consumers/TaxonomyConsumer';

// Hooks
export { usePosts } from './hooks/posts';

// Context
export {
    PostContext, PageContext, MenuContext, AppContext,
    SettingsContext, TaxonomyContext, SearchContext, CategoriesContext, MediaContext,
} from './providers/Context';
export type { AppContextType, MenuContextType } from './providers/Context';

// Context types (from context-types.ts)
export type {
    PostContextType, PageContextType, SettingsContextType,
    TaxonomyContextType, SearchContextType, CategoriesContextType, MediaContextType,
} from './providers/context-types';

// Template parts
export { default as PostContent } from './template-parts/PostContent';
export { default as PostDate } from './template-parts/PostDate';
export { default as PostIcon } from './template-parts/PostIcon';
export { default as PostIntro } from './template-parts/PostIntro';
export { default as PostLabel } from './template-parts/PostLabel';
export { default as PostTitle } from './template-parts/PostTitle';
export { default as Content } from './template-parts/Content';

// Templates (legacy — note: same names as types below; value vs type namespace)
export { default as PostPage } from './templates/Post';
export { default as PageTemplate } from './templates/Page';
export { default as CategoryTemplate } from './templates/Category';
export { default as TaxonomyTemplate } from './templates/Taxonomy';
// Original names preserved for backward compatibility
export { default as Post } from './templates/Post';
export { default as Page } from './templates/Page';
export { default as Category } from './templates/Category';
export { default as Taxonomy } from './templates/Taxonomy';

// Types
export type { DgSettings, Media, SearchResults, WpCategory } from './types';
// Taxonomy and Category are exported as component values below; alias their types
export type { Taxonomy as TaxonomyType } from './types';
export type { Category as CategoryType } from './types';
export type { Menu } from './types';

// Utilities
export { default as utils } from './util/index';

// Deprecated: Redux
export { default as wordpress } from './reducers/wordpress';
