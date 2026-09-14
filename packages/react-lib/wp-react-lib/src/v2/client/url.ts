import { WPConfigError } from './errors';

const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:\/\//i;

export const isAbsoluteUrl = (url: string): boolean => ABSOLUTE_URL_PATTERN.test(url) || url.startsWith('//');

export const stripTrailingSlash = (url: string): string => (url.endsWith('/') ? url.slice(0, -1) : url);

/**
 * A relative baseUrl (e.g. "/wp") resolves against the page's own origin in a
 * browser, but `fetch` under Node/undici cannot resolve a relative URL at
 * all - there is no origin to resolve it against. So on the server a
 * relative baseUrl needs an explicit `origin` to be prefixed onto - typically
 * derived from the incoming request (e.g. `new URL(request.url).origin` in a
 * loader), or an internal address (e.g. "http://wordpress:8080") if SSR
 * requests should bypass the public-facing proxy. Without `window` and
 * without `origin`, there is truly nothing to resolve against, so it throws.
 */
export const resolveBaseUrl = (baseUrl: string, origin?: string): string => {
    const trimmed = stripTrailingSlash(baseUrl);

    if (isAbsoluteUrl(trimmed)) {
        return trimmed;
    }

    if (typeof window !== 'undefined') {
        return trimmed;
    }

    if (origin) {
        try {
            return stripTrailingSlash(new URL(trimmed, origin).toString());
        } catch {
            throw new WPConfigError(`Could not resolve relative baseUrl "${baseUrl}" against origin "${origin}" - origin must be an absolute URL (e.g. "https://example.com").`);
        }
    }

    throw new WPConfigError(
        `baseUrl must be an absolute URL when rendering outside the browser (no \`window\` present). ` +
        `Received relative baseUrl "${baseUrl}" with no \`origin\` configured. Either pass a fully-qualified ` +
        `baseUrl, or pass \`origin\` (e.g. derived from the incoming request's URL in an SSR loader) so the ` +
        `relative path can be resolved during server-side rendering.`
    );
};

export const joinUrl = (base: string, path: string): string => {
    const normalizedBase = stripTrailingSlash(base);
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${normalizedBase}${normalizedPath}`;
};

export const withQuery = (url: string, params: Record<string, unknown> = {}): string => {
    const query = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => {
            const stringValue = value instanceof Date ? value.toISOString() : String(value);
            return `${encodeURIComponent(key)}=${encodeURIComponent(stringValue)}`;
        })
        .join('&');

    return query ? `${url}?${query}` : url;
};

export const randomCacheBust = (): string => (Math.random() + 1).toString(36).substring(7);
