import { describe, expect, it, vi, type Mock } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { createWordPressClient } from '../client/WPClient';
import { wpApi } from './wpApi';

const fetchMock = (body: unknown): Mock => vi.fn(async () => new Response(JSON.stringify(body), { status: 200 }));

const asFetch = (fetchImpl: Mock): typeof fetch => fetchImpl as unknown as typeof fetch;

// Mirrors how a consuming app registers wpApi: no module-level client, the
// WPClient is injected per-store via the thunk extra argument.
const makeStore = (client: ReturnType<typeof createWordPressClient>) =>
    configureStore({
        reducer: { [wpApi.reducerPath]: wpApi.reducer },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: client } }).concat(wpApi.middleware),
    });

describe('wpApi', () => {
    it('getPosts resolves via the client supplied as the store extra argument', async () => {
        const fetchImpl = fetchMock([{ id: 1, slug: 'hello' }]);
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });
        const store = makeStore(client);

        const result = await store.dispatch(wpApi.endpoints.getPosts.initiate({ slug: 'hello' }));

        expect(result.data?.data).toEqual([{ id: 1, slug: 'hello' }]);
        expect(fetchImpl).toHaveBeenCalledTimes(1);
        expect(fetchImpl.mock.calls[0][0]).toBe('https://example.com/wp/wp/v2/posts?slug=hello');
    });

    it('getSettings surfaces a non-ok response as a WPApiError, not a thrown exception', async () => {
        const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ message: 'nope' }), { status: 500 })) as unknown as Mock;
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });
        const store = makeStore(client);

        const result = await store.dispatch(wpApi.endpoints.getSettings.initiate());

        expect(result.error).toMatchObject({ name: 'WPApiError', status: 500 });
    });

    it('two stores configured with different clients never leak into each other (no module-level singleton)', async () => {
        const fetchA = fetchMock({ name: 'Site A' });
        const fetchB = fetchMock({ name: 'Site B' });
        const storeA = makeStore(createWordPressClient({ baseUrl: 'https://a.example.com/wp', fetch: asFetch(fetchA) }));
        const storeB = makeStore(createWordPressClient({ baseUrl: 'https://b.example.com/wp', fetch: asFetch(fetchB) }));

        const [resultA, resultB] = await Promise.all([
            storeA.dispatch(wpApi.endpoints.getSettings.initiate()),
            storeB.dispatch(wpApi.endpoints.getSettings.initiate()),
        ]);

        expect(resultA.data?.data).toEqual({ name: 'Site A' });
        expect(resultB.data?.data).toEqual({ name: 'Site B' });
        expect(fetchA.mock.calls[0][0]).toContain('a.example.com');
        expect(fetchB.mock.calls[0][0]).toContain('b.example.com');
    });

    it('getRunningQueriesThunk() awaits every initiate()d query - the multi-endpoint prefetch pattern documented in the README', async () => {
        const fetchImpl = vi.fn(async (url: string) =>
            url.includes('posts') ? new Response(JSON.stringify([{ id: 1 }]), { status: 200 }) : new Response(JSON.stringify({ name: 'Site' }), { status: 200 })
        ) as unknown as Mock;
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });
        const store = makeStore(client);

        store.dispatch(wpApi.endpoints.getPosts.initiate({ perPage: 10 }));
        store.dispatch(wpApi.endpoints.getSettings.initiate());

        await Promise.all(store.dispatch(wpApi.util.getRunningQueriesThunk()));

        expect(fetchImpl).toHaveBeenCalledTimes(2);
        const queries = Object.values(store.getState()[wpApi.reducerPath].queries);
        expect(queries.every((q) => (q as { status: string }).status === 'fulfilled')).toBe(true);
    });
});
