'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { WPClient, createWordPressClient } from '../client/WPClient';
import { WPConfigError } from '../client/errors';
import type { WPClientConfig } from '../client/types';

export interface WordPressContextValue {
    client: WPClient;
}

// Module-scope context is fine to share across requests - what must stay
// per-request is the *value*, built fresh for each Provider instance below.
export const WordPressContext = createContext<WordPressContextValue | undefined>(undefined);

export interface WordPressProviderProps {
    children: ReactNode;
    /** Provide this to let the Provider build the client for you. */
    config?: WPClientConfig;
    /** Provide this if you already built a client yourself (e.g. to prefetch data in an SSR loader before rendering). */
    client?: WPClient;
}

/**
 * Works identically during SSR and in the browser: `useState(() => ...)`'s
 * lazy initializer runs once per component-tree instance, so a fresh client
 * is created per request on the server rather than shared as a singleton.
 */
export function WordPressProvider({ children, config, client }: WordPressProviderProps) {
    if (!config && !client) {
        throw new WPConfigError('WordPressProvider requires either a `config` or a `client` prop.');
    }

    const [value] = useState<WordPressContextValue>(() => ({
        client: client ?? createWordPressClient(config!),
    }));

    return <WordPressContext.Provider value={value}>{children}</WordPressContext.Provider>;
}

export function useWordPress(): WordPressContextValue {
    const context = useContext(WordPressContext);
    if (!context) {
        throw new Error('useWordPress must be used within a WordPressProvider.');
    }
    return context;
}

export function useWPClient(): WPClient {
    return useWordPress().client;
}
