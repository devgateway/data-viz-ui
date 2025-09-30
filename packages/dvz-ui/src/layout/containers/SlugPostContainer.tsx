import React from 'react'
import { useParams } from 'react-router';
import ResponsiveContainer from '../ResponsiveContainer';
import {
    PostProvider,
    PostConsumer,
    Post,
    PostType
} from "@devgateway/wp-react-lib"

interface SlugPostContainerProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    posts?: PostType;
}

const SlugPostContainer = ({ header, footer, posts }: SlugPostContainerProps = {}) => {
    const { lan: locale, slug } = useParams();

    if (posts) {
        return (
            <Post posts={posts} />
        )
    }

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
}

export default SlugPostContainer
