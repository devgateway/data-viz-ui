import {
    PageProvider,
    PageConsumer,
    Page
} from "@devgateway/wp-react-lib"
import React from 'react'
import { useParams } from 'react-router-dom';
import ResponsiveContainer from '../ResponsiveContainer';
import Helmet from '@/Helmet';

const SlugContainer = () => {
    const { locale, slug } = useParams();
    return (
        <PageProvider
            locale={locale}
            slug={slug}
            store={slug}>
            <ResponsiveContainer>
                <PageConsumer>

                    {/* <Helmet locale={locale}></Helmet> */}
                    <Page></Page>
                </PageConsumer>
            </ResponsiveContainer>
        </PageProvider>
    )
}

export default SlugContainer
