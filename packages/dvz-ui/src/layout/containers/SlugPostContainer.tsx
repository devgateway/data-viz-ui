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
    const { lan: locale, slug, parent, year, month, day } = useParams();

    if (posts) {
        const renderedPosts = typeof posts === 'object' ? [posts] : posts;
        return (
            <ResponsiveContainer header={header} footer={footer}>
                <Post posts={renderedPosts} />
            </ResponsiveContainer>
        )
    }

    console.log('SlugPostContainer falling back to PostProvider');

    return (
        <PostProvider
            slug={slug}
            store={slug}
            locale={locale}
            type={parent}
            year={year}
            month={month}
            day={day}
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
