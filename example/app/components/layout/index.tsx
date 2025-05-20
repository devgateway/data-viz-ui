import React, { useEffect } from 'react'
import { Navigate, Outlet, useParams } from 'react-router';
import {
    store,
    updateIntl,
    englishTranslations,
    frenchTranslations,
    afrikaansTranslations,
    getComponentByNameIgnoreCase
} from '@devgateway/dvz-ui-react';
import { IntlProvider } from 'react-intl';
import { AppContextProvider, SettingProvider, SettingsConsumer } from '@devgateway/wp-react-lib';
import { Provider } from 'react-redux'

type Locale = 'en' | 'fr' | 'am';

const messages: Record<Locale, any> = {
    'en': englishTranslations.default,
    'fr': frenchTranslations.default,
    'am': afrikaansTranslations.default
};

interface LayoutProps {
    children: React.DetailedReactHTMLElement<any, HTMLElement>;
}

const Layout = () => {
    const pathParams = useParams();
    const defaultLocale = "en";
    const locale = pathParams.lan;

    useEffect(() => {
        if (process.env) {

            console.log("----------.env-----------");
            console.log(process.env);
            console.log("----------.env-----------");
        }


        window && window.setTimeout(() => {
            if (window && window.location.hash) {
                const element = document.getElementById(window.location.hash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: "auto", block: "start" });
                }
            }
        }, 2000);
    }, []);

    useEffect(() => {
        // This effect runs on every update, equivalent to componentDidUpdate
        store.dispatch(updateIntl({ locale, formats: {}, messages: messages[locale as Locale ?? 'en'] }));
    }, []);

    const urlParams = new URLSearchParams(window && window.location.search);
    const customize_changeset_uuid = urlParams.get('customize_changeset_uuid');


    useEffect(() => {
        // @ts-ignore
        window.isCustomizedPreview = customize_changeset_uuid != null;
    }, [customize_changeset_uuid]);


    if (!locale) {
        return <Navigate to={defaultLocale}></Navigate>
    }

    return (
        <Provider store={store}>
            <IntlProvider key={locale} locale={locale} messages={messages[locale as Locale]}>
                <AppContextProvider getComponent={getComponentByNameIgnoreCase} store={store} locale={locale}>
                    <SettingProvider locale={locale} changeUUID={customize_changeset_uuid}>
                        <SettingsConsumer>
                            <Outlet />
                        </SettingsConsumer>
                    </SettingProvider>
                </AppContextProvider>
            </IntlProvider>
        </Provider>
    );
}

export default Layout;