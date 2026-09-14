'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';
import type { WPClient } from '../client/WPClient';
import { useWPClient } from '../context/WordPressContext';
import { wpQueryKeys } from './keys';

export interface UseMenuParams {
    name: string;
    locale?: string;
}

/** WP Menus plugin response shape is plugin-specific; type it at the call site, e.g. `useMenu<MyMenuShape>(...)`. */
export function menuQueryOptions<T = unknown>(client: WPClient, params: UseMenuParams) {
    const { name, locale } = params;
    return queryOptions({
        queryKey: wpQueryKeys.menu(name, locale),
        queryFn: () => client.getMenu<T>(name, locale),
    });
}

export function useMenu<T = unknown>(params: UseMenuParams, options?: Omit<ReturnType<typeof menuQueryOptions<T>>, 'queryKey' | 'queryFn'>) {
    const client = useWPClient();
    return useQuery({ ...menuQueryOptions<T>(client, params), ...options });
}
