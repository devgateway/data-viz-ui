'use client';

import type { Post } from '../../post-type';
import type { GetPagesParams } from '../client/WPClient';
import { useWordPress } from '../context/WordPressContext';
import { useWPQuery, type UseWPQueryResult } from './useWPQuery';
import type { ResponseMeta } from '../client/types';

export interface UsePagesOptions extends GetPagesParams {
    initialData?: Post[] | null;
    initialMeta?: ResponseMeta | null;
}

export type UsePagesResult = UseWPQueryResult<Post[]>;

export function usePages(options: UsePagesOptions = {}): UsePagesResult {
    const { client } = useWordPress();
    const { initialData, initialMeta, ...params } = options;

    return useWPQuery(() => client.getPages(params), JSON.stringify(params), { data: initialData, meta: initialMeta });
}
