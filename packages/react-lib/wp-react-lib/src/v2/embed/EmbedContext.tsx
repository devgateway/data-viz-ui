'use client';

import { createContext, useContext, useState, type ComponentType, type ReactNode } from 'react';

export type EmbedRegistry = Record<string, ComponentType<any>>;

export interface EmbedContextValue {
    registry: EmbedRegistry;
    /**
     * Wraps every embedded component's mounted root. Required because
     * EmbeddedGateway mounts into a DOM node that came from raw
     * `dangerouslySetInnerHTML` HTML via a *separate* `ReactDOM.createRoot`
     * call - a separate root inherits no context from the surrounding tree,
     * no matter what wraps EmbedProvider itself. Re-provide here whatever
     * context an embedded component needs (its own i18n provider, a v2
     * WordPressProvider so it can call useSettings()/usePosts(), a redux
     * Provider if the host app still uses one for its own components, etc).
     */
    wrapper?: (children: ReactNode) => ReactNode;
}

export const EmbedContext = createContext<EmbedContextValue | undefined>(undefined);

export interface EmbedProviderProps extends EmbedContextValue {
    children: ReactNode;
}

export function EmbedProvider({ children, registry, wrapper }: EmbedProviderProps) {
    const [value] = useState<EmbedContextValue>(() => ({ registry, wrapper }));
    return <EmbedContext.Provider value={value}>{children}</EmbedContext.Provider>;
}

/** Returns `undefined` when there's no EmbedProvider - callers should degrade gracefully, not throw. */
export function useEmbedRegistry(): EmbedContextValue | undefined {
    return useContext(EmbedContext);
}
