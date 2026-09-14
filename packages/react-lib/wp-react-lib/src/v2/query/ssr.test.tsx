import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider, dehydrate, hydrate } from '@tanstack/react-query';
import { WordPressProvider } from '../context/WordPressContext';
import { createWordPressClient } from '../client/WPClient';
import { usePosts, postsQueryOptions } from '.';

// No jsdom in this file - vitest's default Node environment has no `window`,
// so renderToStaticMarkup here is real SSR, not a simulation.

describe('TanStack Query adapter under real SSR (renderToStaticMarkup, no window)', () => {
    it('renders without crashing and without attempting a fetch - useQuery only fetches via an effect, which never runs during SSR', () => {
        const fetchImpl = vi.fn(async () => new Response(JSON.stringify([]), { status: 200 }));
        const queryClient = new QueryClient();

        function Page() {
            const { data, isPending } = usePosts({ slug: 'x' });
            return <div>{isPending ? 'pending' : JSON.stringify(data)}</div>;
        }

        const html = renderToStaticMarkup(
            <QueryClientProvider client={queryClient}>
                <WordPressProvider config={{ baseUrl: 'https://example.com/wp', fetch: fetchImpl as unknown as typeof fetch }}>
                    <Page />
                </WordPressProvider>
            </QueryClientProvider>
        );

        expect(html).toContain('pending');
        expect(fetchImpl).not.toHaveBeenCalled();
    });

    it('a query prefetched and dehydrated on the server renders real content directly in the SSR HTML, with no fetch during that render', async () => {
        const fetchImpl = vi.fn(async () => new Response(JSON.stringify([{ id: 7 }]), { status: 200 }));
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: fetchImpl as unknown as typeof fetch });

        // Simulates the server: prefetch, then dehydrate (this is what a loader would embed into loaderData).
        const serverQueryClient = new QueryClient();
        await serverQueryClient.prefetchQuery(postsQueryOptions(client, { slug: 'y' }));
        const dehydratedState = dehydrate(serverQueryClient);
        expect(fetchImpl).toHaveBeenCalledTimes(1);

        // Simulates the actual render pass: a fresh QueryClient hydrated from that dehydrated state
        // (what HydrationBoundary does under the hood), matching the real per-request-client pattern.
        const renderQueryClient = new QueryClient();
        hydrate(renderQueryClient, dehydratedState);

        function Page() {
            const { data, isPending } = usePosts({ slug: 'y' });
            return <div>{isPending ? 'pending' : data?.data.length}</div>;
        }

        const html = renderToStaticMarkup(
            <QueryClientProvider client={renderQueryClient}>
                <WordPressProvider config={{ baseUrl: 'https://example.com/wp', fetch: fetchImpl as unknown as typeof fetch }}>
                    <Page />
                </WordPressProvider>
            </QueryClientProvider>
        );

        expect(html).toContain('1');
        expect(fetchImpl).toHaveBeenCalledTimes(1);
    });
});
