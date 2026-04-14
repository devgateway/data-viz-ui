import React, { Suspense, memo, useMemo } from 'react';
import { AppContext } from './Context';
import type { AppContextType } from './Context';

interface AppContextProviderProps {
    locale: string;
    apiBaseUrl?: string;
    changeUUID?: string;
    store?: unknown;
    getComponent?: (name: string) => unknown;
    children: React.ReactNode;
}

const AppContextProvider = ({ locale, apiBaseUrl, changeUUID, store, getComponent, children }: AppContextProviderProps) => {
    const memoizedValue = useMemo<AppContextType>(() => ({
        locale,
        apiBaseUrl,
        changeUUID,
        store,
        getComponent,
    }), [locale, apiBaseUrl, changeUUID, store, getComponent]);

    return (
        <AppContext.Provider value={memoizedValue}>
            <Suspense>
                {children}
            </Suspense>
        </AppContext.Provider>
    );
};

export default memo(AppContextProvider);
