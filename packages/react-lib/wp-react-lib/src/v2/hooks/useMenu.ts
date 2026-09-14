'use client';

import { useWordPress } from '../context/WordPressContext';
import { useWPQuery, type UseWPQueryResult } from './useWPQuery';

export interface UseMenuOptions<T> {
    name: string;
    locale?: string;
    initialData?: T | null;
}

export type UseMenuResult<T> = UseWPQueryResult<T>;

/** WP Menus plugin response shape is plugin-specific; type it at the call site, e.g. `useMenu<MyMenuShape>(...)`. */
export function useMenu<T = unknown>(options: UseMenuOptions<T>): UseMenuResult<T> {
    const { client } = useWordPress();
    const { name, locale, initialData } = options;

    return useWPQuery(() => client.getMenu<T>(name, locale), JSON.stringify({ name, locale }), { data: initialData });
}
