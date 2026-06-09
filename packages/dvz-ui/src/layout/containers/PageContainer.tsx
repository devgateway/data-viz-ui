import {
    PageProvider,
    PageConsumer,
    Page,
    Post
} from "@devgateway/wp-react-lib"
import React from 'react'
import {useParams} from 'react-router';
import ResponsiveContainer from '../ResponsiveContainer';

interface SlugContainerProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    page: Object;
}

const PageContainer = ({header, footer, page}: SlugContainerProps) => {
    const {lan: locale, slug} = useParams();

    //eslint-disable-next-line

    return (

        <ResponsiveContainer header={header} footer={footer}>
            <Post></Post>
        </ResponsiveContainer>
    )
}

export default PageContainer
