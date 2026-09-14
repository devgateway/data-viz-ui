import { Fragment } from 'react';
import type { Post as PostType } from '../../post-type';
import { PostContent, type ContentProps } from '../template-parts';

export interface PageProps extends Omit<ContentProps, 'post'> {
    pages: PostType[] | null;
}

export function Page({ pages, ...props }: PageProps) {
    if (!pages) {
        return null;
    }

    return (
        <Fragment>
            {pages.map((page, idx) => (
                <Fragment key={idx}>
                    <PostContent post={page} {...props} />
                </Fragment>
            ))}
        </Fragment>
    );
}
