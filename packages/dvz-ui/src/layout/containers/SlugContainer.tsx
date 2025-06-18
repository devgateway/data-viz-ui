import {
    PageProvider,
    PageConsumer,
    Page
} from "@devgateway/wp-react-lib"
import React from 'react'
import { useParams } from 'react-router';
import ResponsiveContainer from '../ResponsiveContainer';

interface SlugContainerProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const SlugContainer = ({ header, footer }: SlugContainerProps) => {
    const { lan: locale ,slug } = useParams();
    return (
        <PageProvider
            locale={locale}
            slug={slug}
            store={slug}>
            <ResponsiveContainer header={header} footer={footer}>
                <PageConsumer>
                    <Page></Page>
                </PageConsumer>
            </ResponsiveContainer>
        </PageProvider>
    )
}

export default SlugContainer
