'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';
import type { WPClient, SearchParams } from '../client/WPClient';
import { useWPClient } from '../context/WordPressContext';
import { wpQueryKeys } from './keys';

export function searchQueryOptions(client: WPClient, params: SearchParams = {}) {
    return queryOptions({
        queryKey: wpQueryKeys.search(params),
        queryFn: () => client.search(params),
    });
}

export type UseSearchQueryOptions = Omit<ReturnType<typeof searchQueryOptions>, 'queryKey' | 'queryFn'>;

export function useSearch(params: SearchParams = {}, options?: UseSearchQueryOptions) {
    const client = useWPClient();
    return useQuery({ ...searchQueryOptions(client, params), ...options });
}
