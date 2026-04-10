import React from 'react'

import { Container } from '@devgateway/ui'
import { SettingsConsumer } from '@devgateway/wp-react-lib'
import { Media, MediaContextProvider, mediaStyle } from "@/utils/AppMedia"
import Footer from "./Footer";
import Header from "./Header";
import TopNavigator from "./TopNavigator";
import { CustomizerWrapper } from "./Customizer";


export interface DesktopContainerProps {
    children: React.ReactNode;
    fixed: boolean;
    header?: React.ReactNode;
}


const DesktopContainer = ({ children, fixed = false, header }: DesktopContainerProps) => {
    const AnyHeader = Header as React.ComponentType<{ settings?: unknown }>;
    return (
        <Container fluid={true}>
            <SettingsConsumer>
                {/* @ts-ignore – settings is injected at runtime by SettingsConsumer via cloneElement */}
                <CustomizerWrapper>
                    { header ? header : <AnyHeader />}
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
    pages?: unknown[];
    header?: React.ReactNode;
    footer?: React.ReactNode;
}


function ResponsiveContainer (props: ResponsiveContainerProps) {

    const {children, fixed, locale, pages, header, footer} = props;
    const page = pages ? pages[0] as { template?: string } : null;

    return (
        <MediaContextProvider>
            <div>
                <style>{mediaStyle}</style>
                <DesktopContainer fixed={fixed!} header={header}>
                    {children}
                </DesktopContainer>
                {footer ? footer : (page && page.template === "noofoter.php" ? "" : <Footer />)}
            </div>
        </MediaContextProvider>
    )
}


export default ResponsiveContainer
