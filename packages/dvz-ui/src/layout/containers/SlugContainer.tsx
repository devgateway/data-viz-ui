import {
    PageProvider,
    PageConsumer,
    Page,
    PostType
} from "@devgateway/wp-react-lib"
import React from 'react'
import { useParams } from 'react-router';
import ResponsiveContainer from '../ResponsiveContainer';
import type { ContainerSSRProps, SerializablePost } from './types';

interface SlugContainerProps extends ContainerSSRProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    pages?: PostType;
}

const SlugContainer = ({ header, footer, pages, initialData }: SlugContainerProps = {}) => {

    const { lan: locale, slug } = useParams();

    // SSR path: initialData injected by server — bypass Redux fetching entirely
    if (initialData) {
        return (
            <ResponsiveContainer header={header} footer={footer}>
                <Page pages={initialData as unknown as PostType[]} />
            </ResponsiveContainer>
        );
    }

    if (pages) {
        return (
            <ResponsiveContainer header={header} footer={footer}>
                <Page pages={typeof pages === 'object' ? [pages] : pages} />
            </ResponsiveContainer>
        )
    }

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
