'use client';

import type { Post } from '../../post-type';
import type { GetPostsParams } from '../client/WPClient';
import { useWordPress } from '../context/WordPressContext';
import { useWPQuery, type UseWPQueryResult } from './useWPQuery';
import type { ResponseMeta } from '../client/types';

export interface UsePostsOptions extends GetPostsParams {
    initialData?: Post[] | null;
    initialMeta?: ResponseMeta | null;
}

export type UsePostsResult = UseWPQueryResult<Post[]>;

export function usePosts(options: UsePostsOptions = {}): UsePostsResult {
    const { client } = useWordPress();
    const { initialData, initialMeta, ...params } = options;

    return useWPQuery(() => client.getPosts(params), JSON.stringify(params), { data: initialData, meta: initialMeta });
}
