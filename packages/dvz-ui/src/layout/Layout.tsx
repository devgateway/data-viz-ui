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
            window.setTimeout(() => {
                if (window.location.hash) {
                    const element = document.getElementById(window.location.hash.substring(1));
                    if (element) {
                        element.scrollIntoView({ behavior: "auto", block: "start" });
                    }
                }
            }, 2000);
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

export default RootLayout;