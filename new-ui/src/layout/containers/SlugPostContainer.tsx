import React from 'react'
import { useParams } from 'react-router-dom';
import ResponsiveContainer from '../ResponsiveContainer';
import PostProvider from '@devgateway/wp-react-lib/dist/providers/PostProvider';
import PostConsumer from '@devgateway/wp-react-lib/dist/consumers/PostConsumer';
import Post from '@devgateway/wp-react-lib/dist/templates/Post';


const SlugPostContainer = () => {
    const { locale, slug } = useParams();
    return (
        <ResponsiveContainer>
            <PostProvider
                slug={slug}
                store={slug}
                locale={locale}
            >
                <PostConsumer>
                    <Post></Post>
                </PostConsumer>
            </PostProvider>
        </ResponsiveContainer>
    )
}

export default SlugPostContainer