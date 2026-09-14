import { describe, expect, it, vi, type Mock } from 'vitest';
import { WPClient, createWordPressClient } from './WPClient';
import { WPConfigError } from './errors';

const fetchMock = (): Mock => vi.fn(async () => new Response(JSON.stringify([]), { status: 200 }));

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
