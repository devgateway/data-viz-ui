'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';
import type { WPClient } from '../client/WPClient';
import { useWPClient } from '../context/WordPressContext';
import { wpQueryKeys } from './keys';

export interface UseSettingsParams {
    locale?: string;
    changesetUuid?: string;
}

export function settingsQueryOptions(client: WPClient, params: UseSettingsParams = {}) {
    const { locale, changesetUuid } = params;
    return queryOptions({
        queryKey: wpQueryKeys.settings(locale, changesetUuid),
        queryFn: () => client.getSettings(locale, changesetUuid),
    });
}

export type UseSettingsQueryOptions = Omit<ReturnType<typeof settingsQueryOptions>, 'queryKey' | 'queryFn'>;

export function useSettings(params: UseSettingsParams = {}, options?: UseSettingsQueryOptions) {
    const client = useWPClient();
    return useQuery({ ...settingsQueryOptions(client, params), ...options });
}
