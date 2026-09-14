'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ResponseMeta, WPResponse } from '../client/types';

export interface UseWPQueryResult<T> {
    data: T | null;
    meta: ResponseMeta | null;
    loading: boolean;
    error: unknown;
    refetch: () => void;
}

export interface UseWPQueryInitial<T> {
    data?: T | null;
    meta?: ResponseMeta | null;
}

/**
 * Shared fetch/refetch state machine behind every domain hook (usePosts,
 * usePages, ...). `fetchFn` is read from a ref rather than put in the effect
 * dependency array - callers pass a fresh closure every render, and putting
 * it in deps would refetch every render. `depsKey` (e.g.
 * `JSON.stringify(params)`) is the only reactive dependency.
 *
 * If `initial.data` was provided (typically hydrated from an SSR loader),
 * the first fetch is skipped - the caller already has authoritative data
 * for the first render. Every subsequent `depsKey` change, and every
 * `refetch()` call, always fetches.
 */
export function useWPQuery<T>(fetchFn: () => Promise<WPResponse<T>>, depsKey: string, initial?: UseWPQueryInitial<T>): UseWPQueryResult<T> {
    const fetchRef = useRef(fetchFn);
    fetchRef.current = fetchFn;

    const hasInitialData = initial?.data !== undefined;
    const [state, setState] = useState<{ data: T | null; meta: ResponseMeta | null; loading: boolean; error: unknown }>(() => ({
        data: initial?.data ?? null,
        meta: initial?.meta ?? null,
        loading: !hasInitialData,
        error: null,
    }));
    const [refetchToken, setRefetchToken] = useState(0);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            if (hasInitialData) {
                return;
            }
        }

        let cancelled = false;
        setState((s) => ({ ...s, loading: true, error: null }));

        fetchRef
            .current()
            .then(({ data, meta }) => {
                if (!cancelled) {
                    setState({ data, meta, loading: false, error: null });
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    setState((s) => ({ ...s, loading: false, error }));
                }
            });

        return () => {
            cancelled = true;
        };
        // `fetchRef` is a ref (stable identity, read via `.current` so it's
        // exempt from the dependency list) - it's what lets a fresh closure
        // be passed on every render without listing it or refetching every
        // render. `hasInitialData` is a plain boolean and safe/honest to list.
    }, [depsKey, refetchToken, hasInitialData]);

    const refetch = useCallback(() => setRefetchToken((t) => t + 1), []);

    return { ...state, refetch };
}
