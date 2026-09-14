import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createWordPressClient } from '../client/WPClient';
import { wpApi, useGetPostsQuery } from '.';

// No jsdom in this file - vitest's default Node environment has no `window`,
// so renderToStaticMarkup here is real SSR, not a simulation.

const reducer = { [wpApi.reducerPath]: wpApi.reducer };

const makeStore = (client: ReturnType<typeof createWordPressClient>, preloadedState?: { [wpApi.reducerPath]: ReturnType<typeof wpApi.reducer> }) =>
    configureStore({
        reducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: client } }).concat(wpApi.middleware),
    });

describe('RTK Query adapter under real SSR (renderToStaticMarkup, no window)', () => {
    it('renders without crashing and without attempting a fetch - the generated query hook only fetches via an effect', () => {
        const fetchImpl = vi.fn(async () => new Response(JSON.stringify([]), { status: 200 }));
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: fetchImpl as unknown as typeof fetch });
        const store = makeStore(client);

        function Page() {
            const { data, isLoading } = useGetPostsQuery({ slug: 'x' });
            return <div>{isLoading ? 'loading' : JSON.stringify(data)}</div>;
        }

        const html = renderToStaticMarkup(
            <Provider store={store}>
                <Page />
            </Provider>
        );

        expect(html).toContain('loading');
        expect(fetchImpl).not.toHaveBeenCalled();
    });

    it('a store seeded with server-dispatched preloadedState renders content directly, with no refetch on mount', async () => {
        const fetchImpl = vi.fn(async () => new Response(JSON.stringify([{ id: 9 }]), { status: 200 }));
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: fetchImpl as unknown as typeof fetch });

        // Simulates the server: a per-request store that prefetches via `initiate`.
        const serverStore = makeStore(client);
        await serverStore.dispatch(wpApi.endpoints.getPosts.initiate({ slug: 'z' }));
        const preloadedState = serverStore.getState();
        expect(fetchImpl).toHaveBeenCalledTimes(1);

        // Simulates the actual render pass: a NEW store created with that exact
        // preloadedState (the Next.js with-apollo-and-redux example's pattern -
        // createStore(reducer, preloadedState) - not a dispatched HYDRATE action).
        const renderStore = makeStore(client, preloadedState);

        function Page() {
            const { data, isLoading } = useGetPostsQuery({ slug: 'z' });
            return <div>{isLoading ? 'loading' : data?.data.length}</div>;
        }

        const html = renderToStaticMarkup(
            <Provider store={renderStore}>
                <Page />
            </Provider>
        );

        expect(html).toContain('1');
        expect(fetchImpl).toHaveBeenCalledTimes(1);
    });

    it('skip: true never fetches, even client-side after mount - for data a loader already returned as a plain prop', async () => {
        const fetchImpl = vi.fn(async () => new Response(JSON.stringify([{ id: 3 }]), { status: 200 }));
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: fetchImpl as unknown as typeof fetch });
        const store = makeStore(client);

        function Page({ existingPosts }: { existingPosts?: { id: number }[] }) {
            const { data, isLoading } = useGetPostsQuery({ slug: 'w' }, { skip: Boolean(existingPosts) });
            const posts = existingPosts ?? data?.data;
            return <div>{isLoading ? 'loading' : JSON.stringify(posts)}</div>;
        }

        // SSR pass: the loader already fetched `existingPosts` some other way (plain WPClient call,
        // not through wpApi) and passed it down - no preloadedState/store-seeding needed at all here.
        const html = renderToStaticMarkup(
            <Provider store={store}>
                <Page existingPosts={[{ id: 3 }]} />
            </Provider>
        );

        expect(html).toContain('id');
        expect(html).not.toContain('loading');
        expect(fetchImpl).not.toHaveBeenCalled();
    });
});
