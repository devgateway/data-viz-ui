'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';
import type { WPClient, GetCategoriesParams } from '../client/WPClient';
import { useWPClient } from '../context/WordPressContext';
import { wpQueryKeys } from './keys';

export function categoriesQueryOptions(client: WPClient, params: GetCategoriesParams = {}) {
    return queryOptions({
        queryKey: wpQueryKeys.categories(params),
        queryFn: () => client.getCategories(params),
    });
}

export type UseCategoriesQueryOptions = Omit<ReturnType<typeof categoriesQueryOptions>, 'queryKey' | 'queryFn'>;

export function useCategories(params: GetCategoriesParams = {}, options?: UseCategoriesQueryOptions) {
    const client = useWPClient();
    return useQuery({ ...categoriesQueryOptions(client, params), ...options });
}
