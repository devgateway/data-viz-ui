import React, { lazy } from "react";

export interface ComponentsProp {
    [key: string]: React.ComponentType<any>
}

const download = lazy(() => import('./download'));
const search = lazy(() => import('./search'));

export const components: ComponentsProp = {
    download: download,
    search: search
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
