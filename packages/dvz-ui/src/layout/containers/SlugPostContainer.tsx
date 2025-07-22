import React from 'react'
import { useParams } from 'react-router';
import ResponsiveContainer from '../ResponsiveContainer';
import {
    PostProvider,
    PostConsumer,
    Post
} from "@devgateway/wp-react-lib"

interface SlugPostContainerProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const SlugPostContainer = ({ header, footer }: SlugPostContainerProps) => {
    const { lan: locale, slug } = useParams();
    return (
        <PostProvider
            slug={slug}
            store={slug}
            locale={locale}
        >
            <ResponsiveContainer header={header} footer={footer}>

                <PostConsumer>
                    <Post />
                </PostConsumer>

            </ResponsiveContainer>
        </PostProvider>
    )
}

export default SlugPostContainer
