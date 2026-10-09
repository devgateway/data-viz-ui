import React, { lazy } from "react";

export interface ComponentsProp {
    [key: string]: React.ComponentType<any>
}

// `components` below is derived from these loaders: `lazy()` wraps them for
// client-side code-splitting, but `React.lazy` components can't be rendered
// by synchronous SSR APIs like `renderToStaticMarkup` (they throw "A
// component suspended..." since there's no Suspense boundary to resolve
// against). Server-side rendering (see front's wp-embeddables.server.ts)
// needs the plain, awaited module instead - hence exposing `loaders` too.
export const loaders: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
    download: () => import('./download'),
    search: () => import('./search'),
    themeList: () => import('./theme-list'),
    datasetList: () => import('./dataset-list'),
    datasetFiles: () => import('./dataset-files'),
    datasetResources: () => import('./dataset-resources'),
    datasetMetadata: () => import('./dataset-metadata'),
    datasetDoi: () => import('./dataset-doi'),
    datasetLicense: () => import('./dataset-license'),
    datasetCitation: () => import('./dataset-citation'),
    datasetPage: () => import('./dataset-page'),
    variableBrowser: () => import('./variable-browser'),
    searchFiltersContainer: () => import('./search-filters-container'),
    categoryFilter: () => import('./category-filter'),
    searchBox: () => import('./search-box'),
    datasetSearchResults: () => import('./dataset-search-results'),
    tabbedPosts: () => import('./tabbed-posts'),
}


export const components: ComponentsProp = Object.fromEntries(
    Object.entries(loaders).map(([name, load]) => [name, lazy(load)]),
)

export const customizer = {
    components: {},
    registerCustomEmbeddables: (components: Record<string, React.ComponentType<any>>) => {
        for (const [key, value] of Object.entries(components)) {
            customizer.components[key] = value
        }
    },
    getComponentByNameIgnoreCase: (name: string) => {
        const k = Object.keys(customizer.components).find(value => value.toLowerCase() === name.toLowerCase())
        if (k) {
            const Component = customizer.components[k]
            return React.memo(Component)
        }
        return null
    },
}

export const getComponentByNameIgnoreCase = (name: string) => {

    const k = Object.keys(components).find(value => value.toLowerCase() === name.toLowerCase())
    if (k) {
        const Component = components[k]
        return React.memo(Component)
    }

    const customComponent = customizer.getComponentByNameIgnoreCase(name)
    if (customComponent) {
        return React.memo(customComponent)
    }

    return null
}
