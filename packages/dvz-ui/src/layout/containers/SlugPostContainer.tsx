import React from 'react'
import { useParams } from 'react-router';
import ResponsiveContainer from '../ResponsiveContainer';
import {
    PostProvider,
    PostConsumer,
    Post,
    PostType
} from "@devgateway/wp-react-lib"
import type { ContainerSSRProps } from './types';

interface SlugPostContainerProps extends ContainerSSRProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    posts?: PostType;
}

const SlugPostContainer = ({ header, footer, posts, initialData }: SlugPostContainerProps = {}) => {
    const { lan: locale, slug, parent, year, month, day } = useParams();

    // SSR path: initialData injected by server — bypass Redux fetching entirely
    if (initialData) {
        return (
            <ResponsiveContainer header={header} footer={footer}>
                <Post posts={initialData as unknown as PostType[]} />
            </ResponsiveContainer>
        );
    }

    if (posts) {
        const renderedPosts = typeof posts === 'object' ? [posts] : posts;
        return (
            <ResponsiveContainer header={header} footer={footer}>
                <Post posts={renderedPosts} />
            </ResponsiveContainer>
        )
    }

    return (
        <PostProvider
            type={parent}
            slug={slug}
            store={slug}
            locale={locale}
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
