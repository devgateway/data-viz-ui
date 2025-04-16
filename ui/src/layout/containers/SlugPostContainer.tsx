import React from 'react'
import { useParams } from 'react-router-dom';
import ResponsiveContainer from '../ResponsiveContainer';
import {
    PostProvider,
    PostConsumer,
    Post
} from "@devgateway/wp-react-lib"


const SlugPostContainer = () => {
    const { lan: locale, slug } = useParams();
    return (
        <ResponsiveContainer>
            <PostProvider
                slug={slug}
                store={slug}
                locale={locale}
            >
                <PostConsumer>
                    <Post/>
                </PostConsumer>
            </PostProvider>
        </ResponsiveContainer>
    )
}

export default SlugPostContainer
