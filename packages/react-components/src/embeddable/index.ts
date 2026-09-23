import React, { lazy } from "react";

export interface ComponentsProp {
    [key: string]: React.ComponentType<any>
}

// The same loader functions back both maps below: `lazy()` wraps them for
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
}

const download = lazy(loaders.download);
const search = lazy(loaders.search);
const themeList = lazy(loaders.themeList);
const datasetList = lazy(loaders.datasetList);
const datasetFiles = lazy(loaders.datasetFiles);

export const components: ComponentsProp = {
    download: download,
    search: search,
    themeList: themeList,
    datasetList: datasetList,
    datasetFiles: datasetFiles
}

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
