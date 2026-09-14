'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';
import type { WPClient, GetPostsParams } from '../client/WPClient';
import { useWPClient } from '../context/WordPressContext';
import { wpQueryKeys } from './keys';

/** Usable directly with `queryClient.prefetchQuery`/`fetchQuery` in a loader - same key and fetcher the hook uses, so hydration matches with no refetch. */
export function postsQueryOptions(client: WPClient, params: GetPostsParams = {}) {
    return queryOptions({
        queryKey: wpQueryKeys.posts(params),
        queryFn: () => client.getPosts(params),
    });
}

export type UsePostsQueryOptions = Omit<ReturnType<typeof postsQueryOptions>, 'queryKey' | 'queryFn'>;

export function usePosts(params: GetPostsParams = {}, options?: UsePostsQueryOptions) {
    const client = useWPClient();
    return useQuery({ ...postsQueryOptions(client, params), ...options });
}
