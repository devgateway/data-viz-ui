import React, {Component, createRef, useEffect, useRef, useState} from 'react';
import {Provider} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router' // react-router v4/v5
import {ConnectedRouter} from 'connected-react-router/immutable'
import getStore, {history} from './redux/store'
import messages_en from "./translations/en.json";
import {updateIntl} from 'react-intl-redux'
import {injectIntl, IntlProvider} from "react-intl";
import smoothscroll from 'smoothscroll-polyfill';
import ResponsiveContainer from './layout'
import {getComponentByNameIgnoreCase} from "./embeddable";
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
import {Container, Segment} from "semantic-ui-react";
import CustomizerWrapper from "./layout/Customizer";

const store = getStore();

// kick off the polyfill!
smoothscroll.polyfill();

const messages = {
    'en': messages_en
};


const PreviewComponentParameterParser = (props) => {


    const componentRef = useRef(getComponentByNameIgnoreCase(props.match.params.name))

    const UIComponent = componentRef.current


    const [params, setParams] = useState(queryString.parse(props.location.search))
    const readMessage = (event) => {
        console.log("-------------------------------reading message ----------------------------------------")
        const data = event.data
        if (data.messageType && data.messageType == 'component-attributes') {

            const newPrams = {...params}
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
            window.parent.postMessage({type: "componentReady", value: true}, "*")
        }
        return () => {
            window.removeEventListener('message', readMessage);
        };


    }, [])


    return (<Container fluid={true} className={"editing"}>
        {UIComponent ? <UIComponent  {...params} editing={true}></UIComponent> :
            <Segment color={"red"} textAlign={"center"}><h1>Wrong Component Name</h1></Segment>}
    </Container>)

}

const InjectTitle = injectIntl((props) => {

    //description
    document.title = props.settings.description
    console.log(props.settings)
    return <></>
})

class IntlRoutes extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("----------.env-----------")
        console.log(process.env)
        console.log("----------.env-----------")
        window.setTimeout(() => {
                if (window.location.hash) {
                    const element = document.getElementById(window.location.hash.substr(1));
                    if (element) {
                        element.scrollIntoView({behavior: "auto", block: "start"});
                    }
                }
            }, 2000
        )

        const locale = this.props.match.params.lan
        store.dispatch(updateIntl({locale, messages: messages[this.props.match.params.lan]}))

    }

    componentDidUpdate() {
        const locale = this.props.match.params.lan
        store.dispatch(updateIntl({locale, messages: messages[locale]}))
    }

    render() {
        const self = this;
        const props = this.props;
        const locale = this.props.match.params.lan

        const urlParams = new URLSearchParams(window.location.search);
        const customize_changeset_uuid = urlParams.get('customize_changeset_uuid');
        window.isCustomizedPreview = customize_changeset_uuid != null
        return (
            <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
                <AppContextProvider getComponent={getComponentByNameIgnoreCase} store={store} locale={locale}>
                    <SettingProvider locale={locale} changeUUID={customize_changeset_uuid}>
                        <ScrollToTop/>
                        <SettingsConsumer>
                            <CustomizerWrapper>
                                <InjectTitle/>
                            </CustomizerWrapper>
                        </SettingsConsumer>
                        <Switch>
                            {
                                //Category Route
                            }
                            <Route path="/:lan/category/:slug/">
                                <ResponsiveContainer>
                                    <Category/>
                                </ResponsiveContainer>
                            </Route>
                            {
                                //default route (home)
                            }
                            <Route path="/:lan" exact render={props => (
                                <PageProvider
                                    slug={"home"}
                                    locale={locale}
                                    store={"home"}>
                                    <PageConsumer>
                                        <ResponsiveContainer>
                                            <PageConsumer>
                                                <Helmet></Helmet>
                                                <Page></Page>
                                            </PageConsumer>
                                        </ResponsiveContainer>
                                    </PageConsumer>
                                </PageProvider>

                            )}>
                            </Route>
                            <Route exact={true} path="/:lan/embeddable/:name" render={(props) =>
                                <PreviewComponentParameterParser  {...props}></PreviewComponentParameterParser>}>
                            </Route>


                            <Route path={"/:lan/preview/page/:id"} exact render={props => {

                                const searchParams = new URLSearchParams(props.location.search)
                                const preview = searchParams.get("preview")
                                const previewNonce = searchParams.get("_wpnonce")
                                return (
                                    <ResponsiveContainer>
                                        <PageProvider store={"preview"} perPage={1} view={preview}
                                                      previewNonce={previewNonce} previewId={props.match.params.id}>
                                            <PageConsumer>

                                                <Page preview={true}/>
                                            </PageConsumer>

                                        </PageProvider>
                                    </ResponsiveContainer>
                                )
                            }}>
                            </Route>

                            <Route path={"/:lan/preview/:type/:id"} exact render={props => {

                                const searchParams = new URLSearchParams(props.location.search)
                                const preview = searchParams.get("preview")
                                const type = props.match.params.type == 'post' ? 'posts' : props.match.params.type
                                const previewNonce = searchParams.get("_wpnonce")
                                return (
                                    <ResponsiveContainer>
                                        <PostProvider type={type}
                                                      store={"preview"}
                                                      perPage={1}
                                                      view={preview}
                                                      locale={props.match.params.lan}
                                                      previewNonce={previewNonce}
                                                      previewId={props.match.params.id}>
                                            <PostConsumer>
                                                <Post preview={true} showIntro={true}/>
                                            </PostConsumer>

                                        </PostProvider>
                                    </ResponsiveContainer>
                                )
                            }}>
                            </Route>
                            {
                                //page route
                            }
                            <Route path="/:lan/:slug/" exact render={props => {

                                return (

                                    <PageProvider
                                        locale={locale}
                                        slug={props.match.params.slug}
                                        store={props.match.params.slug}>
                                        <ResponsiveContainer>
                                            <PageConsumer>
                                                <Helmet></Helmet>
                                                <Page></Page>
                                            </PageConsumer>
                                        </ResponsiveContainer>
                                    </PageProvider>
                                )
                            }}>
                            </Route>
                            {
                                //child route
                            }
                            <Route path="/:lan/:parent/:slug/" exact render={props => (
                                <PageProvider
                                    locale={locale}
                                    slug={props.match.params.slug}
                                    store={props.match.params.slug}>
                                    <ResponsiveContainer>
                                        <PageConsumer>

                                            <Helmet></Helmet>
                                            <Page></Page>
                                        </PageConsumer>
                                    </ResponsiveContainer>
                                </PageProvider>

                            )}>


                            </Route>


                            <Route path="/:lan/:year/:month/:day/:slug/" exact render={props => (
                                <ResponsiveContainer>
                                    <PostProvider
                                        slug={props.match.params.slug}
                                        store={props.match.params.slug}
                                        locale={locale}
                                    >
                                        <PostConsumer>
                                            <Post></Post>
                                        </PostConsumer>
                                    </PostProvider>
                                </ResponsiveContainer>
                            )}>
                            </Route>
                            <Route path="/:lan/:parent/:year/:month/:day/:slug/" exact render={props => (

                                <ResponsiveContainer>

                                    <PostProvider
                                        type={props.match.params.parent}
                                        slug={props.match.params.slug}
                                        store={props.match.params.slug}
                                        locale={locale}>
                                        <PostConsumer>
                                            <Post></Post>
                                        </PostConsumer>
                                    </PostProvider>
                                </ResponsiveContainer>
                            )}>
                            </Route>

                        </Switch>
                    </SettingProvider>
                </AppContextProvider>

            </IntlProvider>)
    }
}


const WithTrackerRoutes = WithTracker(IntlRoutes)


const MainRoutes = (props) => {
    return (<ConnectedRouter history={history}>

        <Switch>
            <Route path="/:lan" render={(props) => <WithTrackerRoutes {...props}/>}/>
            <Route path={"/"}>
                <Redirect
                    to={process.env.REACT_APP_DEFAULT_LOCALE ? process.env.REACT_APP_DEFAULT_LOCALE : "en"}></Redirect>
            </Route>

        </Switch>

    </ConnectedRouter>)
}

class AppWrapper
    extends Component {
    render() {
        return (<Provider store={store}>
            <MainRoutes/>
        </Provider>);
    }
}

export default AppWrapper;
