'use client';

import type { GetCategoriesParams } from '../client/WPClient';
import type { ResponseMeta, WPTerm } from '../client/types';
import { useWordPress } from '../context/WordPressContext';
import { useWPQuery, type UseWPQueryResult } from './useWPQuery';

export interface UseCategoriesOptions extends GetCategoriesParams {
    initialData?: WPTerm[] | null;
    initialMeta?: ResponseMeta | null;
}

export type UseCategoriesResult = UseWPQueryResult<WPTerm[]>;

export function useCategories(options: UseCategoriesOptions = {}): UseCategoriesResult {
    const { client } = useWordPress();
    const { initialData, initialMeta, ...params } = options;

    return useWPQuery(() => client.getCategories(params), JSON.stringify(params), { data: initialData, meta: initialMeta });
}
