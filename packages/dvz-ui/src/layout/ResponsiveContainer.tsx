import React from 'react'

import {Container,} from 'semantic-ui-react'
import {SettingsConsumer} from '@devgateway/wp-react-lib'
import {Media} from "@/utils/AppMedia.js"
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import TopNavigator from "./TopNavigator.jsx";
import { CustomizerWrapper } from "./Customizer.jsx";


export interface DesktopContainerProps {
    children: React.ReactNode;
    fixed: boolean;
    header?: React.ReactNode;
}


const DesktopContainer = ({ children, fixed = false, header }: DesktopContainerProps) => {
    return (
        <Container fluid={true}>
            <SettingsConsumer>
                <CustomizerWrapper>
                    {/* @ts-ignore */}
                   { header ? header : <Header />}
                </CustomizerWrapper>
            </SettingsConsumer>
            <Container className="desktop">
                {children}
            </Container>
            <TopNavigator/>
        </Container>
    )
}


export interface ResponsiveContainerProps {
    children: React.ReactNode;
    fixed?: boolean;
    locale?: string;
    pages?: any[];
    header?: React.ReactNode;
    footer?: React.ReactNode;
}


function ResponsiveContainer (props: ResponsiveContainerProps) {

    const {children, fixed, locale, pages, header, footer} = props;
    const page = pages ? pages[0] : null;

        return (<div>
            <style>
                {/* @ts-ignore */}
                {Media.mediaStyles}
            </style>
            <DesktopContainer fixed={fixed!} header={header}>
                {children}
            </DesktopContainer>
            {footer ? footer : (page && page.template === "noofoter.php" ? "" : <Footer />)}
        </div>)
}


export default ResponsiveContainer
