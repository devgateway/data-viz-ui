import { describe, expect, it } from 'vitest';
import { request } from './request';
import { WPApiError, WPTimeoutError } from './errors';

const okResponse = (body: unknown, headers: Record<string, string> = {}) =>
    (async () => new Response(JSON.stringify(body), { status: 200, headers }))();

const errorResponse = (status: number, body: unknown) =>
    (async () => new Response(JSON.stringify(body), { status }))();

describe('request', () => {
    it('resolves data and parses WP pagination headers into meta', async () => {
        const fetchImpl = (() => okResponse({ id: 1 }, { 'x-wp-total': '42', 'x-wp-totalpages': '5' })) as unknown as typeof fetch;

        const result = await request<{ id: number }>('https://example.com/wp/v2/posts', { fetch: fetchImpl });

        expect(result.data).toEqual({ id: 1 });
        expect(result.meta.total).toBe(42);
        expect(result.meta.totalPages).toBe(5);
    });

    it('throws a WPApiError carrying status, url and parsed body on a non-ok response', async () => {
        const fetchImpl = (() => errorResponse(404, { message: 'not found' })) as unknown as typeof fetch;

        await expect(request('https://example.com/wp/v2/posts/999', { fetch: fetchImpl })).rejects.toMatchObject({
            name: 'WPApiError',
            status: 404,
            url: 'https://example.com/wp/v2/posts/999',
            body: { message: 'not found' },
        });
    });

    it('is an instance of WPApiError', async () => {
        const fetchImpl = (() => errorResponse(500, {})) as unknown as typeof fetch;
        await expect(request('https://example.com/wp/v2/posts', { fetch: fetchImpl })).rejects.toBeInstanceOf(WPApiError);
    });

    it('throws a WPTimeoutError when the request is aborted after the configured timeout', async () => {
        const fetchImpl = ((_url: string, init?: RequestInit) =>
            new Promise((_resolve, reject) => {
                init?.signal?.addEventListener('abort', () => {
                    const err = new Error('The operation was aborted');
                    err.name = 'AbortError';
                    reject(err);
                });
            })) as unknown as typeof fetch;

        await expect(request('https://example.com/wp/v2/posts', { fetch: fetchImpl, timeout: 5 })).rejects.toBeInstanceOf(WPTimeoutError);
    });
});
