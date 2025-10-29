import React, {Component} from "react";
import {Container} from "semantic-ui-react";

import {Page, PageConsumer, PageProvider} from "@devgateway/wp-react-lib";
import {injectIntl} from "react-intl";
import { useAppConfig } from "@/utils/ConfigProvider";


const Footer = ({ children, fixed, location, intl: { locale } }) => {
    const { apiBaseUrl } = useAppConfig();

    return (
        <Container fluid className={"viz footer"}>
            <PageProvider locale={locale} slug={"footer"} store={"footer"} apiBaseUrl={apiBaseUrl}>
                <PageConsumer>
                    <Page></Page>
                </PageConsumer>
            </PageProvider>
        </Container>
    );
};


export default injectIntl(Footer)