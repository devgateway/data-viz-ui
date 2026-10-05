export { default as Test } from './test';
export { default as DatasetPage, type DatasetPageProps } from './embeddable/dataset-page';
export { default as VariableBrowser, type VariableBrowserProps } from './embeddable/variable-browser';
export * from './embeddable';
export { portalApi, useGetCategoriesQuery, useGetCategoryValuesQuery } from './embeddable/shared/api';
export { createEmbeddableStore } from './embeddable/shared/store';

// Non-lazy exports for consumers that want to render these directly (e.g. a
// static page), rather than through the `embeddable` name-lookup registry.
export { default as ThemeList, type ThemeListProps, type ThemeListColumns } from './embeddable/theme-list/ThemeList';
export { default as ThemeCard, type Theme, type ThemeCardProps } from './embeddable/theme-list/ThemeCard';
export { default as DatasetList, type DatasetListProps } from './embeddable/dataset-list/DatasetList';
export { default as DatasetListItem, type LatestDatasetItem, type DatasetListItemProps } from './embeddable/dataset-list/DatasetListItem';