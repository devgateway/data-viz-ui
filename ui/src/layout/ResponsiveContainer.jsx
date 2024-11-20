import React from 'react'

import {Container,} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {SettingsConsumer} from '@devgateway/wp-react-lib'
import {Media} from "../AppMedia.js"
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import TopNavigator from "./TopNavigator.jsx";
import CustomizerWrapper from "./Customizer.jsx";


const DesktopContainer = ({ children, fixed }) => {
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

DesktopContainer.propTypes = {
    children: PropTypes.node,
}


function ResponsiveContainer (props) {

    const {children, fixed, locale, pages} = props
    const page = pages ? pages[0] : null;

        return (<div>
            <style>
                {Media.mediaStyles}
            </style>
            <DesktopContainer fixed={fixed}>
                {children}
            </DesktopContainer>
            {page && page.template === "noofoter.php" ? "" : <Footer></Footer>}
        </div>)
}


export default ResponsiveContainer
