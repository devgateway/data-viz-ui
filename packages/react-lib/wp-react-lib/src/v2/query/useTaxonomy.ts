'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';
import type { WPClient } from '../client/WPClient';
import type { WPTerm } from '../client/types';
import { useWPClient } from '../context/WordPressContext';
import { wpQueryKeys } from './keys';

export interface UseTaxonomyParams {
    /** Taxonomy REST base, e.g. "categories" or "tags". */
    name: string;
    locale?: string;
}

export function taxonomyQueryOptions<T = WPTerm[]>(client: WPClient, params: UseTaxonomyParams) {
    const { name, locale } = params;
    return queryOptions({
        queryKey: wpQueryKeys.taxonomy(name, locale),
        queryFn: () => client.getTaxonomy<T>(name, locale),
    });
}

export function useTaxonomy<T = WPTerm[]>(params: UseTaxonomyParams, options?: Omit<ReturnType<typeof taxonomyQueryOptions<T>>, 'queryKey' | 'queryFn'>) {
    const client = useWPClient();
    return useQuery({ ...taxonomyQueryOptions<T>(client, params), ...options });
}
