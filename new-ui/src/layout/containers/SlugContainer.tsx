import PageConsumer from '@devgateway/wp-react-lib/dist/consumers/PageConsumer';
import PageProvider from '@devgateway/wp-react-lib/dist/providers/PageProvider';
import React from 'react'
import { useParams } from 'react-router-dom';
import ResponsiveContainer from '../ResponsiveContainer';
import Page from '@devgateway/wp-react-lib/dist/templates/Page';
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