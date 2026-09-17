import { describe, expect, it, vi, type Mock } from 'vitest';
import { WPClient, createWordPressClient } from './WPClient';
import { WPApiError, WPConfigError } from './errors';

const fetchMock = (): Mock => vi.fn(async () => new Response(JSON.stringify([]), { status: 200 }));

const fetchMockWithStatus = (status: number, body: unknown): Mock =>
    vi.fn(async () => new Response(JSON.stringify(body), { status }));

const rejection = async (promise: Promise<unknown>): Promise<WPApiError> => {
    try {
        await promise;
    } catch (error) {
        if (error instanceof WPApiError) {
            return error;
        }
        throw error;
    }
    throw new Error('expected promise to reject');
};

const asFetch = (fetchImpl: Mock): typeof fetch => fetchImpl as unknown as typeof fetch;

const calledUrl = (fetchImpl: Mock): string => fetchImpl.mock.calls[0]?.[0] as string;

const calledInit = (fetchImpl: Mock): RequestInit | undefined => fetchImpl.mock.calls[0]?.[1] as RequestInit | undefined;

describe('createWordPressClient', () => {
    it('returns a WPClient instance', () => {
        expect(createWordPressClient({ baseUrl: 'https://example.com/wp' })).toBeInstanceOf(WPClient);
    });
});

describe('WPClient#getPosts', () => {
    it('filters by slug and omits the category/pagination params', async () => {
        const fetchImpl = fetchMock();
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        await client.getPosts({ slug: 'about', locale: 'en' });

        expect(calledUrl(fetchImpl)).toBe('https://example.com/wp/wp/v2/posts?lang=en&slug=about');
    });

    it('uses the taxonomy name as the query key when filtering by categories', async () => {
        const fetchImpl = fetchMock();
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        await client.getPosts({ taxonomy: 'genre', categories: '5', locale: 'en', perPage: 10 });

        expect(calledUrl(fetchImpl)).toBe('https://example.com/wp/wp/v2/posts?lang=en&genre=5&per_page=10');
    });

    it('requests revisions when previewId is set', async () => {
        const fetchImpl = fetchMock();
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        await client.getPosts({ previewId: '42', previewNonce: 'abc' });

        expect(calledUrl(fetchImpl)).toBe('https://example.com/wp/wp/v2/posts/42/revisions?_wpnonce=abc');
    });

    it('respects a custom post type', async () => {
        const fetchImpl = fetchMock();
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        await client.getPosts({ type: 'news', slug: 'launch' });

        expect(calledUrl(fetchImpl)).toBe('https://example.com/wp/wp/v2/news?slug=launch');
    });
});

describe('WPClient#getPost', () => {
    it('fetches a single post by id', async () => {
        const fetchImpl = fetchMock();
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        await client.getPost('42');

        expect(calledUrl(fetchImpl)).toBe('https://example.com/wp/wp/v2/posts/42');
    });

    it('rejects with a 401 WPApiError when the post is not published', async () => {
        const forbidden = { code: 'rest_forbidden', message: 'Sorry, you are not allowed to do that.', data: { status: 401 } };
        const fetchImpl = fetchMockWithStatus(401, forbidden);
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        const error = await rejection(client.getPost('42'));

        expect(error).toBeInstanceOf(WPApiError);
        expect(error.status).toBe(401);
        expect(error.body).toEqual(forbidden);
    });

    it('rejects with a 404 WPApiError when the post does not exist', async () => {
        const notFound = { code: 'rest_post_invalid_id', message: 'Invalid post ID.', data: { status: 404 } };
        const fetchImpl = fetchMockWithStatus(404, notFound);
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        const error = await rejection(client.getPost('999'));

        expect(error).toBeInstanceOf(WPApiError);
        expect(error.status).toBe(404);
        expect(error.body).toEqual(notFound);
    });
});

describe('WPClient#getPage', () => {
    it('fetches a single page by id', async () => {
        const fetchImpl = fetchMock();
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        await client.getPage('7');

        expect(calledUrl(fetchImpl)).toBe('https://example.com/wp/wp/v2/pages/7');
    });

    it('rejects with a 401 WPApiError when the page is not published', async () => {
        const forbidden = { code: 'rest_forbidden', message: 'Sorry, you are not allowed to do that.', data: { status: 401 } };
        const fetchImpl = fetchMockWithStatus(401, forbidden);
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        const error = await rejection(client.getPage('7'));

        expect(error).toBeInstanceOf(WPApiError);
        expect(error.status).toBe(401);
        expect(error.body).toEqual(forbidden);
    });

    it('rejects with a 404 WPApiError when the page does not exist', async () => {
        const notFound = { code: 'rest_post_invalid_id', message: 'Invalid post ID.', data: { status: 404 } };
        const fetchImpl = fetchMockWithStatus(404, notFound);
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        const error = await rejection(client.getPage('999'));

        expect(error).toBeInstanceOf(WPApiError);
        expect(error.status).toBe(404);
        expect(error.body).toEqual(notFound);
    });
});

describe('WPClient#getCategories', () => {
    it('applies the documented defaults', async () => {
        const fetchImpl = fetchMock();
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        await client.getCategories({});

        expect(calledUrl(fetchImpl)).toBe(
            'https://example.com/wp/wp/v2/categories?context=view&page=1&per_page=10&order=asc&orderby=name'
        );
    });
});

describe('WPClient#getSettings', () => {
    it('always includes a cache-busting param', async () => {
        const fetchImpl = fetchMock();
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp', fetch: asFetch(fetchImpl) });

        await client.getSettings('en');

        expect(calledUrl(fetchImpl)).toMatch(/^https:\/\/example\.com\/wp\/dg\/v1\/settings\?cacheBust=\w+&lang=en$/);
    });
});

describe('WPClient headers', () => {
    it('merges default, config and per-call headers', async () => {
        const fetchImpl = fetchMock();
        const client = createWordPressClient({
            baseUrl: 'https://example.com/wp',
            headers: { 'X-Custom-Header': 'foobar' },
            fetch: asFetch(fetchImpl),
        });

        await client.getSettings();

        expect(calledInit(fetchImpl)).toMatchObject({
            headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-Custom-Header': 'foobar' },
        });
    });
});

describe('WPClient with a relative baseUrl on the server', () => {
    it('throws WPConfigError when a method is actually called and there is no `origin` (construction alone is fine)', async () => {
        const client = createWordPressClient({ baseUrl: '/wp' });
        expect(client).toBeInstanceOf(WPClient); // constructing never throws

        await expect(client.getSettings()).rejects.toBeInstanceOf(WPConfigError);
    });

    it('resolves and fetches successfully when `origin` is configured', async () => {
        const fetchImpl = fetchMock();
        const client = createWordPressClient({ baseUrl: '/wp', origin: 'https://example.com', fetch: asFetch(fetchImpl) });

        await client.getPosts({ slug: 'about' });

        expect(calledUrl(fetchImpl)).toBe('https://example.com/wp/wp/v2/posts?slug=about');
    });
});
