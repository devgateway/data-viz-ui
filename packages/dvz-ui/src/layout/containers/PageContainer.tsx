import {
    PageProvider,
    PageConsumer,
    Page
} from "@devgateway/wp-react-lib"
import React from 'react'
import {useParams} from 'react-router';
import ResponsiveContainer from '../ResponsiveContainer';
import type { ContainerSSRProps } from './types';

interface PageContainerProps extends ContainerSSRProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    page?: object;
}

const PageContainer = ({header, footer, page, initialData}: PageContainerProps) => {
    const {lan: locale, slug} = useParams();

    if (initialData) {
        return (
            <ResponsiveContainer header={header} footer={footer}>
                <Page pages={initialData as unknown as any[]} />
            </ResponsiveContainer>
        );
    }

    return (
        <PageProvider locale={locale} slug={slug} store={slug}>
            <ResponsiveContainer header={header} footer={footer}>
                <PageConsumer>
                    <Page />
                </PageConsumer>
            </ResponsiveContainer>
        </PageProvider>
    )
}

export default PageContainer
