import { describe, expect, it } from 'vitest';
import { isAbsoluteUrl, joinUrl, resolveBaseUrl, stripTrailingSlash, withQuery } from './url';
import { WPConfigError } from './errors';

describe('isAbsoluteUrl', () => {
    it('recognizes http(s) and protocol-relative URLs as absolute', () => {
        expect(isAbsoluteUrl('https://example.com/wp')).toBe(true);
        expect(isAbsoluteUrl('http://example.com/wp')).toBe(true);
        expect(isAbsoluteUrl('//example.com/wp')).toBe(true);
    });

    it('treats a path as not absolute', () => {
        expect(isAbsoluteUrl('/wp')).toBe(false);
        expect(isAbsoluteUrl('wp')).toBe(false);
    });
});

describe('resolveBaseUrl', () => {
    it('passes an absolute URL through, stripping a trailing slash', () => {
        expect(resolveBaseUrl('https://example.com/wp/')).toBe('https://example.com/wp');
    });

    // This suite runs under vitest's default Node environment - there is no
    // `window` global here, exactly like a real SSR process. This is the
    // real guarantee, not a simulation of it.
    it('throws a WPConfigError for a relative baseUrl when there is no `window` and no `origin` (the real SSR condition)', () => {
        expect(typeof window).toBe('undefined');
        expect(() => resolveBaseUrl('/wp')).toThrow(WPConfigError);
        expect(() => resolveBaseUrl('/wp')).toThrow(/absolute URL/);
    });

    it('resolves a relative baseUrl against `origin` when there is no `window` (e.g. an SSR loader deriving origin from the incoming request)', () => {
        expect(resolveBaseUrl('/wp', 'https://example.com')).toBe('https://example.com/wp');
    });

    it('resolves against an internal origin, discarding any path already in baseUrl\'s absolute-path form', () => {
        expect(resolveBaseUrl('/wp/', 'http://wordpress:8080')).toBe('http://wordpress:8080/wp');
    });

    it('throws a WPConfigError (not a raw URL parse error) when `origin` itself is not a valid absolute URL', () => {
        expect(() => resolveBaseUrl('/wp', 'not-a-url')).toThrow(WPConfigError);
    });
});

describe('joinUrl', () => {
    it('joins a base and a path without duplicating or dropping slashes', () => {
        expect(joinUrl('https://example.com/wp', '/wp/v2/posts')).toBe('https://example.com/wp/wp/v2/posts');
        expect(joinUrl('https://example.com/wp/', 'wp/v2/posts')).toBe('https://example.com/wp/wp/v2/posts');
    });
});

describe('stripTrailingSlash', () => {
    it('removes exactly one trailing slash', () => {
        expect(stripTrailingSlash('https://example.com/')).toBe('https://example.com');
        expect(stripTrailingSlash('https://example.com')).toBe('https://example.com');
    });
});

describe('withQuery', () => {
    it('omits undefined, null and empty-string params', () => {
        expect(withQuery('https://example.com', { a: undefined, b: null, c: '', d: 0 })).toBe('https://example.com?d=0');
    });

    it('serializes Date values as ISO strings and encodes keys/values', () => {
        const url = withQuery('https://example.com', { before: new Date('2024-01-01T00:00:00.000Z'), 'a b': 'c&d' });
        expect(url).toBe('https://example.com?before=2024-01-01T00%3A00%3A00.000Z&a%20b=c%26d');
    });

    it('returns the url unchanged when there are no params', () => {
        expect(withQuery('https://example.com')).toBe('https://example.com');
    });
});
