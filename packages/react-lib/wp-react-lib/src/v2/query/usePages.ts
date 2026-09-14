'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';
import type { WPClient, GetPagesParams } from '../client/WPClient';
import { useWPClient } from '../context/WordPressContext';
import { wpQueryKeys } from './keys';

export function pagesQueryOptions(client: WPClient, params: GetPagesParams = {}) {
    return queryOptions({
        queryKey: wpQueryKeys.pages(params),
        queryFn: () => client.getPages(params),
    });
}

export type UsePagesQueryOptions = Omit<ReturnType<typeof pagesQueryOptions>, 'queryKey' | 'queryFn'>;

export function usePages(params: GetPagesParams = {}, options?: UsePagesQueryOptions) {
    const client = useWPClient();
    return useQuery({ ...pagesQueryOptions(client, params), ...options });
}
