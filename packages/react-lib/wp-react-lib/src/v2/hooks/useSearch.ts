'use client';

import type { SearchResult } from '../../types';
import type { SearchParams } from '../client/WPClient';
import type { ResponseMeta } from '../client/types';
import { useWordPress } from '../context/WordPressContext';
import { useWPQuery, type UseWPQueryResult } from './useWPQuery';

export interface UseSearchOptions extends SearchParams {
    initialData?: SearchResult[] | null;
    initialMeta?: ResponseMeta | null;
}

export type UseSearchResult = UseWPQueryResult<SearchResult[]>;

export function useSearch(options: UseSearchOptions = {}): UseSearchResult {
    const { client } = useWordPress();
    const { initialData, initialMeta, ...params } = options;

    return useWPQuery(() => client.search(params), JSON.stringify(params), { data: initialData, meta: initialMeta });
}
