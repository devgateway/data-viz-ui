export { WPClient, createWordPressClient } from './client/WPClient';
export type { GetPostsParams, GetPagesParams, GetCategoriesParams, SearchParams } from './client/WPClient';
export type { WPClientConfig, ResponseMeta, WPResponse, WPTerm } from './client/types';
export { WPConfigError, WPApiError, WPTimeoutError } from './client/errors';

export { WordPressContext, WordPressProvider, useWordPress, useWPClient } from './context/WordPressContext';
export type { WordPressContextValue, WordPressProviderProps } from './context/WordPressContext';

export { EmbedContext, EmbedProvider, useEmbedRegistry } from './embed/EmbedContext';
export type { EmbedRegistry, EmbedContextValue, EmbedProviderProps } from './embed/EmbedContext';
export { EmbeddedGateway, type EmbeddedGatewayProps } from './embed/EmbeddedGateway';

export { useWPQuery, type UseWPQueryResult, type UseWPQueryInitial } from './hooks/useWPQuery';
export { useSettings, type UseSettingsOptions, type UseSettingsResult } from './hooks/useSettings';
export { usePosts, type UsePostsOptions, type UsePostsResult } from './hooks/usePosts';
export { usePages, type UsePagesOptions, type UsePagesResult } from './hooks/usePages';
export { useMedia, type UseMediaOptions, type UseMediaResult } from './hooks/useMedia';
export { useMenu, type UseMenuOptions, type UseMenuResult } from './hooks/useMenu';
export { useCategories, type UseCategoriesOptions, type UseCategoriesResult } from './hooks/useCategories';
export { useTaxonomy, type UseTaxonomyOptions, type UseTaxonomyResult } from './hooks/useTaxonomy';
export { useSearch, type UseSearchOptions, type UseSearchResult } from './hooks/useSearch';

export * from './util/content';
export * from './template-parts';
export * from './templates';
