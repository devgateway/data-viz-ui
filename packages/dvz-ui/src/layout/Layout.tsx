import React from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router';
import {
    getComponentByNameIgnoreCase
} from '@/embeddable';
import { IntlProvider } from 'react-intl';
import { AppContextProvider, SettingProvider, SettingsConsumer } from '@devgateway/wp-react-lib';
import { Provider } from 'react-redux';
import { CustomizerWrapper } from '@/layout';
import { Config } from '@/conf';
import { englishTranslations, frenchTranslations, afrikaansTranslations, amharicTranslations } from '@/translations';
import { updateIntl } from '@/lib';
import { store } from '@/redux';
import { ClientEffects } from './ClientEffects';

type Locale = 'en' | 'fr' | 'am' | 'af';

const messages: Record<Locale, Record<string, string>> = {
    'en': englishTranslations,
    'fr': frenchTranslations,
    'am': amharicTranslations,
    'af': afrikaansTranslations
};

// ── Server shell (no 'use client') ──────────────────────────────────────────
// This component contains no useEffect, no useState, and no browser-global
// access. It is safe to render server-side (Next.js RSC / renderToString).
export const RootLayoutShell = ({ locale, children }: { locale: string; children: React.ReactNode }) => (
    <Provider store={store}>
        <IntlProvider key={locale} locale={locale} messages={messages[locale as Locale]}>
            <AppContextProvider getComponent={getComponentByNameIgnoreCase} store={store} locale={locale}>
                <SettingProvider locale={locale} changeUUID={null}>
                    <SettingsConsumer>
                        <CustomizerWrapper />
                        {children}
                    </SettingsConsumer>
                </SettingProvider>
            </AppContextProvider>
        </IntlProvider>
    </Provider>
);

// ── Route component (no 'use client') ────────────────────────────────────────
// Uses React Router hooks which are safe without 'use client' in RSC
// because React Router's server renderer provides the context.
const RootLayout = () => {
    const pathParams = useParams();
    const location = useLocation();
    const defaultLocale = Config.DEFAULT_LOCALE;
    const locale = pathParams.lan;
    const pathname = location.pathname;

    if (!locale) {
        return <Navigate to={defaultLocale} replace />;
    }

    if (!Object.keys(messages).includes(locale)) {
        return <Navigate to={`/${defaultLocale}${pathname}`} replace />;
    }

    return (
        <RootLayoutShell locale={locale}>
            <ClientEffects locale={locale} />
            <Outlet />
        </RootLayoutShell>
    );
};

export default RootLayout as React.ComponentType;
