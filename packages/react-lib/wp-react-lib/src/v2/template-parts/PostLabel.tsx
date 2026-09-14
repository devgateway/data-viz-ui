import type { Post } from '../../post-type';

export interface PostLabelProps {
    post: Post;
}

export function PostLabel({ post }: PostLabelProps) {
    // `meta_fields` values are declared as string[] on Post (see post-type.ts);
    // React renders an array of strings as-is, matching v1's behavior.
    const label = post.meta_fields?.label ?? [];
    return <span className="label">{label}</span>;
}
