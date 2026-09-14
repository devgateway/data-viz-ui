'use client';

import type { DgSettings } from '../../types';
import { useWordPress } from '../context/WordPressContext';
import { useWPQuery, type UseWPQueryResult } from './useWPQuery';

export interface UseSettingsOptions {
    locale?: string;
    changesetUuid?: string;
    /** Data already fetched server-side (e.g. in a route loader) and hydrated into the client render; skips the initial client-side fetch. */
    initialData?: DgSettings | null;
}

export type UseSettingsResult = UseWPQueryResult<DgSettings>;

export function useSettings(options: UseSettingsOptions = {}): UseSettingsResult {
    const { client } = useWordPress();
    const { locale, changesetUuid, initialData } = options;

    return useWPQuery(() => client.getSettings(locale, changesetUuid), JSON.stringify({ locale, changesetUuid }), { data: initialData });
}
