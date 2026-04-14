import React, { useEffect, useContext } from 'react';
import { MenuContext, AppContext } from './Context';
import { createApiClient } from '../api/client';
import type { MenuContextType } from './Context';
import type { ApiError } from '../types';

interface MenuProviderProps {
    /** Menu slug registered in WordPress. */
    name: string;
    locale?: string;
    children: React.ReactNode;
}

const MenuProvider = ({ name, locale, children }: MenuProviderProps) => {
    const appCtx = useContext(AppContext);
    const effectiveLocale = locale ?? appCtx.locale ?? 'en';

    const [state, setState] = React.useState<MenuContextType>({
        menu: null,
        locale: effectiveLocale,
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!name) return;
        setState(prev => ({ ...prev, loading: true }));
        const client = createApiClient(appCtx.apiBaseUrl);
        client.getMenu({ name, locale: effectiveLocale })
            .then(({ data }) => setState({ menu: data, locale: effectiveLocale, loading: false, error: null }))
            .catch((err: ApiError) => setState(prev => ({ ...prev, loading: false, error: err })));
    }, [name, effectiveLocale, appCtx.apiBaseUrl]);

    return <MenuContext.Provider value={state}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
