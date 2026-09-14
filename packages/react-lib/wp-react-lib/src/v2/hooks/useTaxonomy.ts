'use client';

import type { WPTerm } from '../client/types';
import { useWordPress } from '../context/WordPressContext';
import { useWPQuery, type UseWPQueryResult } from './useWPQuery';

export interface UseTaxonomyOptions<T> {
    /** Taxonomy REST base, e.g. "categories" or "tags". */
    name: string;
    locale?: string;
    initialData?: T | null;
}

export type UseTaxonomyResult<T> = UseWPQueryResult<T>;

export function useTaxonomy<T = WPTerm[]>(options: UseTaxonomyOptions<T>): UseTaxonomyResult<T> {
    const { client } = useWordPress();
    const { name, locale, initialData } = options;

    return useWPQuery(() => client.getTaxonomy<T>(name, locale), JSON.stringify({ name, locale }), { data: initialData });
}
