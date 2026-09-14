import type { Post as PostType } from '../../post-type';
import type { WPTerm } from '../client/types';
import { PostContent } from '../template-parts';

export interface CategoryProps {
    category: WPTerm | null;
    posts: PostType[] | null;
}

/**
 * Purely presentational - v1's Category template fetched its own taxonomy
 * and posts internally via TaxonomyProvider/PostProvider. In v2, fetch with
 * `useTaxonomy()`/`usePosts({ categories: [id] })` at the call site and pass
 * the results in here, same as every other v2 template.
 */
export function Category({ category, posts }: CategoryProps) {
    if (!category) {
        return null;
    }

    return (
        <div>
            <h1>{category.name}</h1>
            <div className="has-medium-font-size">{category.description}</div>

            <h2>Posts</h2>
            <ul className="wp post list">
                {posts?.map((post) => (
                    <PostContent key={post.id} as="li" post={post} showTitle showIntro />
                ))}
            </ul>
        </div>
    );
}
