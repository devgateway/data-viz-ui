// noinspection TypeScriptCheckImport

import React, { Component, useEffect, useRef, useState, Suspense } from 'react';
import { Provider } from 'react-redux'
import { Route, Routes, BrowserRouter, Navigate, useLocation, useParams, Outlet } from 'react-router-dom';
import { store } from './redux/store'
import messages_en from "./translations/en.json";
import { updateIntl } from '@/lib/react-intl-redux'
import { injectIntl, IntlProvider } from "react-intl";
import ResponsiveContainer from './layout'
import { getComponentByNameIgnoreCase } from "./embeddable";
import Helmet from './Helmet'
import WithTracker from "./withTracker";
import {
    AppContextProvider,
    Category,
    Page,
    PageConsumer,
    PageProvider,
    Post,
    PostConsumer,
    PostProvider,
    SettingProvider,
    SettingsConsumer
} from "@devgateway/wp-react-lib";
import queryString from "query-string";
import ScrollToTop from "./ScrollTop";
import { Container, Dimmer, Loader, Segment } from "semantic-ui-react";
import CustomizerWrapper from "./layout/Customizer";
import * as process from "node:process";
import PreviewPageContainer from './layout/containers/PreviewPageContainer';
import PreviewTypeContainer from './layout/containers/PreviewTypeContainer';
import SlugContainer from './layout/containers/SlugContainer';
import SlugPostContainer from './layout/containers/SlugPostContainer';


const messages = {
    'en': messages_en
};

const PreviewComponentParameterParser = () => {
    const urlParams = useParams();
    const location = useLocation();

    const componentRef = useRef(getComponentByNameIgnoreCase(urlParams.name ? urlParams.name : ''));

    const UIComponent = componentRef.current


    const [params, setParams] = useState(queryString.parse(location.search))
    const readMessage = (event) => {
        console.log("-------------------------------reading message ----------------------------------------")
        const data = event.data
        if (data.messageType && data.messageType == 'component-attributes') {

            const newPrams = { ...params }
            Object.keys(data).forEach(k => {
                newPrams["data-" + k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()] = typeof data[k] == 'object' ? JSON.stringify(data[k]) : data[k]
            })
            console.log(newPrams)
            setParams(newPrams)
        }
    };


    useEffect(() => {
        window.addEventListener("message", readMessage, false);

        if (window.parent) {
            window.parent.postMessage({ type: "componentReady", value: true }, "*")
        }
        return () => {
            window.removeEventListener('message', readMessage);
        };


    }, [])


    return (
        <div>
            <Suspense fallback={
                <Dimmer active>
                    <Loader>Loading</Loader>
                </Dimmer>
            }>
                <Container fluid={true} className={"editing"}>
                    {/* @ts-ignore */}
                    {UIComponent ? <UIComponent  {...params} editing={true}></UIComponent> :
                        <Segment.Group color={"red"} textAlign={"center"}><h1>Wrong Component Name</h1></Segment.Group>}
                </Container>
            </Suspense>

        </div>

    )

}

const InjectTitle = injectIntl((props) => {

    // @ts-expect-error description
    document.title = props.settings.description
    console.log(props)
    return <></>
})

const IntlRoutes = () => {
    const pathParams = useParams();

    const locale = pathParams.lan;
    console.log("locale", locale)



    useEffect(() => {
        if (process.env) {
            console.log("----------.env-----------");
            console.log(process.env);
            console.log("----------.env-----------");
        }


        window.setTimeout(() => {
            if (window.location.hash) {
                const element = document.getElementById(window.location.hash.substr(1));
                if (element) {
                    element.scrollIntoView({ behavior: "auto", block: "start" });
                }
            }
        }, 2000);
    }, []);

    useEffect(() => {
        // This effect runs on every update, equivalent to componentDidUpdate
        store.dispatch(updateIntl({ locale, formats: {}, messages: messages[locale ? locale : 'en'] }));
    });

    const urlParams = new URLSearchParams(window.location.search);
    const customize_changeset_uuid = urlParams.get('customize_changeset_uuid');
    // @ts-ignore
    window.isCustomizedPreview = customize_changeset_uuid != null;

    if (!locale) {
        return <Navigate to={"/en"}></Navigate>
    }

    return (
        <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
            {/* @ts-expect-error Has no types */}
            <AppContextProvider getComponent={getComponentByNameIgnoreCase} store={store} locale={locale}>
                <SettingProvider locale={locale} changeUUID={customize_changeset_uuid}>
                    <ScrollToTop />
                    <SettingsConsumer>
                        <CustomizerWrapper>
                            <InjectTitle />
                        </CustomizerWrapper>
                    </SettingsConsumer>
                    <Routes>
                        {/* <Route path="/" element={<Outlet />} /> */}
                        {
                            //Category Route
                        }
                        <Route path="/:lan/category/:slug/" element={
                            <ResponsiveContainer>
                                <Category />
                            </ResponsiveContainer>
                        }>
                        </Route>
                        {
                            //default route (home)
                        }

                        <Route path="/" element={(
                            <PageProvider
                                slug={"home"}
                                locale={locale}
                                store={"home"}>
                                <PageConsumer>
                                    <ResponsiveContainer>
                                        <PageConsumer>
                                            <Page />
                                            {/* @ts-ignore */}
                                            <Helmet locale={locale} />
                                        </PageConsumer>
                                    </ResponsiveContainer>
                                </PageConsumer>
                            </PageProvider>
                        )}>
                        </Route>
                        <Route path="/embeddable/:name" element={
                            <SettingsConsumer>
                                <PreviewComponentParameterParser />
                            </SettingsConsumer>}>
                        </Route>

                        <Route path={"/preview/page/:id"} element={<PreviewPageContainer />} />
                        <Route path={"/preview/:type/:id"} element={<PreviewTypeContainer />} />
                        <Route path="/:slug" element={<SlugContainer />} />
                        <Route path="/:parent/:slug" element={<SlugContainer />} />
                        <Route path="/:year/:month/:day/:slug/" element={<SlugPostContainer />} />
                        <Route path="/:parent/:year/:month/:day/:slug/" element={<SlugPostContainer />} />
                    </Routes>
                </SettingProvider>
            </AppContextProvider>
        </IntlProvider>
    );
};


const WithTrackerRoutes = WithTracker(IntlRoutes)

const MainRoutes = (props) => {
    return (
        <BrowserRouter future={{
            v7_startTransition: true
        }}>

            <Routes>
                <Route path="/:lan/*" element={<WithTrackerRoutes {...props} />} />
                <Route path={"/"} element={<WithTrackerRoutes {...props} />} />
            </Routes>
        </BrowserRouter>
    )
}

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <MainRoutes />
        </Provider>
    );
};

export default AppWrapper;
