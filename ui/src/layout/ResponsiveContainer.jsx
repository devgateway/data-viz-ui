import React, {Component, useEffect, useState} from 'react'

import {Container, Icon, Menu, Sidebar,} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {SettingsConsumer} from '@devgateway/wp-react-lib'
import {Media} from "../AppMedia"
import Footer from "./Footer";
import Header from "./Header";
import TopNavigator from "./TopNavigator";
import CustomizerWrapper from "./Customizer";


class DesktopContainer extends Component {
    render() {
        const {children, fixed} = this.props
        return (

            <Container fluid>
                <SettingsConsumer>
                    <CustomizerWrapper>
                        <Header></Header>
                    </CustomizerWrapper>
                </SettingsConsumer>
                <Container className="desktop">
                    {children}
                </Container>
                <TopNavigator/>
            </Container>


        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}


class ResponsiveContainer extends Component {


    render() {
        const {children, fixed, locale, pages} = this.props
        const page = pages ? pages[0] : null;
        return (<div>
            <style>
                {Media.mediaStyles}
            </style>
            <DesktopContainer fixed={fixed}>
                {children}
            </DesktopContainer>
            {page && page.template == "noofoter.php" ? "" : <Footer></Footer>}
        </div>)
    }
}


export default ResponsiveContainer
