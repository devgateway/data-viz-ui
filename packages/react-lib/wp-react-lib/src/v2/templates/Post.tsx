import { Fragment } from 'react';
import type { Post as PostType } from '../../post-type';
import { PostContent, type ContentProps } from '../template-parts';

export interface PostProps extends Omit<ContentProps, 'post'> {
    posts: PostType[] | null;
}

/** A single post renders bare; a list renders each with its title/date shown. */
export function Post({ posts, ...props }: PostProps) {
    if (!posts) {
        return null;
    }

    if (posts.length === 1) {
        return (
            <Fragment>
                <PostContent {...props} post={posts[0]} />
            </Fragment>
        );
    }

    return (
        <Fragment>
            {posts.map((post, idx) => (
                <PostContent key={idx} showTitle showDate {...props} post={post} />
            ))}
        </Fragment>
    );
}
