import React, {Component} from "react";
import {Container} from "semantic-ui-react";

import {Page, PageConsumer, PageProvider} from "@devgateway/wp-react-lib";
import {injectIntl} from "react-intl";


class Footer extends Component {
    componentDidMount() {

    }

    render() {
        const {children, fixed, location,intl: {locale}} = this.props
        return (<Container fluid className={"viz footer"}>

            <PageProvider locale={locale}  slug={"footer"} store={"footer"}>
                <PageConsumer>
                    <Page></Page>
                </PageConsumer>
            </PageProvider>

        </Container>)
    }
}


export default injectIntl(Footer)