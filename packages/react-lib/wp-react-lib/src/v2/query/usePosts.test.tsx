// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WordPressProvider } from '../context/WordPressContext';
import { usePosts, postsQueryOptions, wpQueryKeys } from '.';
import type { UseQueryResult } from '@tanstack/react-query';
import type { WPResponse } from '../client/types';
import type { Post } from '../../post-type';

function mount(ui: React.ReactElement) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
        root.render(ui);
    });
    return { root, container };
}

// TanStack Query's fetch → cache-write → subscriber-notify chain runs through
// its own notifyManager batching, which can take more than one macrotask
// tick to reach a React re-render under a hand-rolled act() harness (no
// @testing-library/react here). Poll instead of assuming one flush suffices.
async function waitFor(check: () => boolean, { timeout = 1000, interval = 10 } = {}) {
    const start = Date.now();
    while (!check()) {
        if (Date.now() - start > timeout) {
            throw new Error('waitFor: condition not met within timeout');
        }
        await act(() => new Promise((resolve) => setTimeout(resolve, interval)));
    }
}

const newQueryClient = () => new QueryClient({ defaultOptions: { queries: { retry: false } } });

const fetchReturning = (body: unknown) => vi.fn(async () => new Response(JSON.stringify(body), { status: 200 }));

describe('usePosts (TanStack Query adapter)', () => {
    it('fetches via WPClient and stores the result in the query cache under wpQueryKeys.posts', async () => {
        const fetchImpl = fetchReturning([{ id: 1 }]);
        const queryClient = newQueryClient();
        let captured: UseQueryResult<WPResponse<Post[]>> | undefined;

        function Consumer() {
            captured = usePosts({ slug: 'hello' });
            return null;
        }

        mount(
            <QueryClientProvider client={queryClient}>
                <WordPressProvider config={{ baseUrl: 'https://example.com/wp', fetch: fetchImpl as unknown as typeof fetch }}>
                    <Consumer />
                </WordPressProvider>
            </QueryClientProvider>
        );

        await waitFor(() => captured?.data !== undefined);

        expect(fetchImpl).toHaveBeenCalledTimes(1);
        expect(captured?.data?.data).toEqual([{ id: 1 }]);
        expect(queryClient.getQueryData(wpQueryKeys.posts({ slug: 'hello' }))).toEqual({ data: [{ id: 1 }], meta: expect.any(Object) });
    });

    it('dedups: two components requesting the same params share a single network request (the point of this adapter)', async () => {
        const fetchImpl = fetchReturning([]);
        const queryClient = newQueryClient();
        let capturedA: UseQueryResult<WPResponse<Post[]>> | undefined;

        function ConsumerA() {
            capturedA = usePosts({ slug: 'shared' });
            return null;
        }
        function ConsumerB() {
            usePosts({ slug: 'shared' });
            return null;
        }

        mount(
            <QueryClientProvider client={queryClient}>
                <WordPressProvider config={{ baseUrl: 'https://example.com/wp', fetch: fetchImpl as unknown as typeof fetch }}>
                    <ConsumerA />
                    <ConsumerB />
                </WordPressProvider>
            </QueryClientProvider>
        );

        await waitFor(() => capturedA?.data !== undefined);

        expect(fetchImpl).toHaveBeenCalledTimes(1);
    });

    it('a query prefetched (e.g. in a route loader) with a non-zero staleTime hydrates with no client-side refetch', async () => {
        const fetchImpl = fetchReturning([{ id: 42 }]);
        // A real SSR app sets a non-zero staleTime specifically so prefetched
        // data isn't immediately stale on mount - TanStack Query's default
        // staleTime is 0, which means "always refetch on mount" even right
        // after a successful prefetch. This is documented, intended behavior,
        // not a bug - the test configures what an app actually would.
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 60_000 } } });
        const client = (await import('../client/WPClient')).createWordPressClient({
            baseUrl: 'https://example.com/wp',
            fetch: fetchImpl as unknown as typeof fetch,
        });

        // Simulates a loader: prefetch with the exact same query-options factory the hook uses.
        await queryClient.prefetchQuery(postsQueryOptions(client, { slug: 'prefetched' }));
        expect(fetchImpl).toHaveBeenCalledTimes(1);

        let captured: UseQueryResult<WPResponse<Post[]>> | undefined;
        function Consumer() {
            captured = usePosts({ slug: 'prefetched' });
            return null;
        }

        mount(
            <QueryClientProvider client={queryClient}>
                <WordPressProvider config={{ baseUrl: 'https://example.com/wp', fetch: fetchImpl as unknown as typeof fetch }}>
                    <Consumer />
                </WordPressProvider>
            </QueryClientProvider>
        );

        await waitFor(() => captured?.data !== undefined);

        // Still just the one prefetch call - mounting the hook against an already-fresh cache entry doesn't refetch.
        expect(fetchImpl).toHaveBeenCalledTimes(1);
        expect(captured?.data?.data).toEqual([{ id: 42 }]);
    });
});
