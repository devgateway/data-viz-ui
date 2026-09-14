'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';
import type { WPClient } from '../client/WPClient';
import { useWPClient } from '../context/WordPressContext';
import { wpQueryKeys } from './keys';

export interface UseMediaParams {
    slug: string;
    locale?: string;
}

export function mediaQueryOptions(client: WPClient, params: UseMediaParams) {
    const { slug, locale } = params;
    return queryOptions({
        queryKey: wpQueryKeys.media(slug, locale),
        queryFn: () => client.getMedia(slug, locale),
    });
}

export type UseMediaQueryOptions = Omit<ReturnType<typeof mediaQueryOptions>, 'queryKey' | 'queryFn'>;

export function useMedia(params: UseMediaParams, options?: UseMediaQueryOptions) {
    const client = useWPClient();
    return useQuery({ ...mediaQueryOptions(client, params), ...options });
}
