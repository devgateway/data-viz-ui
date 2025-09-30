import {
    PageProvider,
    PageConsumer,
    Page,
    PostType
} from "@devgateway/wp-react-lib"
import React from 'react'
import { useParams } from 'react-router';
import ResponsiveContainer from '../ResponsiveContainer';
import { post } from '../../../../react-lib/wp-react-lib/src/api/index';

interface SlugContainerProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    pages?: PostType;
}

const SlugContainer = ({ header, footer, pages }: SlugContainerProps = {}) => {

    const { lan: locale ,slug } = useParams();
    if (pages) {
        return (
            <ResponsiveContainer header={header} footer={footer}>
                <Page pages={pages} />
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
