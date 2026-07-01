import React, { useEffect, useState } from 'react'
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

type Locale = 'en' | 'fr' | 'am' | 'af';

const messages: Record<Locale, any> = {
    'en': englishTranslations,
    'fr': frenchTranslations,
    'am': amharicTranslations,
    'af': afrikaansTranslations
};


const RootLayout = () => {
    const pathParams = useParams();
    const location = useLocation();
    const defaultLocale = Config.DEFAULT_LOCALE;
    const [isClient, setIsClient] = useState(false);
    const locale = pathParams.lan;
    const pathname = location.pathname;
    useEffect(() => {
        setIsClient(true);

        if (process.env.NODE_ENV === "development") {
            console.log("----------.env-----------");
            console.log(process.env);
            console.log("----------.env-----------");
        }

        if (typeof window !== 'undefined') {
            // Handle direct URL navigation with hash (e.g., /page#section)
            const handleInitialHash = () => {
                if (window.location.hash) {
                    const elementId = window.location.hash.substring(1);
                    let attempts = 0;
                    const maxAttempts = 20; // Try for up to 2 seconds
                    
                    const tryScroll = () => {
                        const element = document.getElementById(elementId);
                        if (element) {
                            element.scrollIntoView({ behavior: "smooth", block: "start" });
                        } else if (attempts < maxAttempts) {
                            attempts++;
                            setTimeout(tryScroll, 100); // Retry every 100ms
                        }
                    };
                    
                    tryScroll();
                }
            };

            // Handle anchor link clicks
            const handleAnchorClick = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (target.tagName === 'A') {
                    const href = target.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        const elementId = href.substring(1);
                        const element = document.getElementById(elementId);
                        if (element) {
                            // Update URL without triggering navigation
                            window.history.pushState(null, '', href);
                            // Scroll to element
                            element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                    }
                }
            };

            // Attach click listener to document
            document.addEventListener('click', handleAnchorClick as any);
            
            // Handle initial page load
            handleInitialHash();

            return () => {
                document.removeEventListener('click', handleAnchorClick as any);
            };
        }
    }, []);

    useEffect(() => {
        // This effect runs on every update, equivalent to componentDidUpdate
        store.dispatch(updateIntl({ locale, formats: {}, messages: messages[locale as Locale ?? 'en'] }));
    }, [locale]);

    // const urlParams = new URLSearchParams(window && window.location.search);
    // const customize_changeset_uuid = urlParams.get('customize_changeset_uuid');
    //
    //
    // useEffect(() => {
    //     // @ts-ignore
    //     window.isCustomizedPreview = customize_changeset_uuid != null;
    // }, [customize_changeset_uuid]);


    if (!locale) {
        return <Navigate to={defaultLocale} replace></Navigate>
    }

    if (!Object.keys(messages).includes(locale)) {
        return <Navigate to={`/${defaultLocale}${pathname}`} replace></Navigate>
    }

    return (
        <Provider store={store}>
            <IntlProvider key={locale} locale={locale} messages={messages[locale as Locale]}>
                <AppContextProvider getComponent={getComponentByNameIgnoreCase} store={store} locale={locale}>
                    <SettingProvider locale={locale} changeUUID={null}>
                        <SettingsConsumer>
                            <CustomizerWrapper/>
                            <Outlet />
                        </SettingsConsumer>
                    </SettingProvider>
                </AppContextProvider>
            </IntlProvider>
        </Provider>
    );
}

export default RootLayout as any;
