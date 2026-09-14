'use client';

import type { Media } from '../../types';
import { useWordPress } from '../context/WordPressContext';
import { useWPQuery, type UseWPQueryResult } from './useWPQuery';

export interface UseMediaOptions {
    slug: string;
    locale?: string;
    initialData?: Media | null;
}

export type UseMediaResult = UseWPQueryResult<Media>;

export function useMedia(options: UseMediaOptions): UseMediaResult {
    const { client } = useWordPress();
    const { slug, locale, initialData } = options;

    return useWPQuery(() => client.getMedia(slug, locale), JSON.stringify({ slug, locale }), { data: initialData });
}
