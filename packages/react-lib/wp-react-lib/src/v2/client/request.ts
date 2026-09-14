import { WPApiError, WPTimeoutError } from './errors';
import type { ResponseMeta, WPResponse } from './types';

export interface RequestOptions {
    method?: 'GET' | 'POST';
    body?: unknown;
    headers?: Record<string, string>;
    timeout?: number;
    fetch?: typeof fetch;
    credentials?: RequestCredentials;
}

const parseMeta = (headers: Headers): ResponseMeta => {
    const total = headers.get('x-wp-total');
    const totalPages = headers.get('x-wp-totalpages');

    return {
        total: total !== null ? Number(total) : undefined,
        totalPages: totalPages !== null ? Number(totalPages) : undefined,
        link: headers.get('link') ?? undefined,
        contentType: headers.get('content-type') ?? undefined,
    };
};

export const request = async <T>(url: string, options: RequestOptions = {}): Promise<WPResponse<T>> => {
    const { method = 'GET', body, headers, timeout, fetch: fetchImpl = fetch, credentials } = options;

    const controller = timeout ? new AbortController() : undefined;
    const timer = controller ? setTimeout(() => controller.abort(), timeout) : undefined;

    try {
        const response = await fetchImpl(url, {
            method,
            credentials,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            signal: controller?.signal,
        });

        if (!response.ok) {
            let parsedBody: unknown;
            try {
                parsedBody = await response.json();
            } catch {
                parsedBody = undefined;
            }
            throw new WPApiError(`WordPress request to ${url} failed with status ${response.status}`, {
                status: response.status,
                url,
                body: parsedBody,
            });
        }

        const data = (await response.json()) as T;
        return { data, meta: parseMeta(response.headers) };
    } catch (error) {
        if (controller?.signal.aborted) {
            throw new WPTimeoutError(url, timeout!);
        }
        throw error;
    } finally {
        if (timer) {
            clearTimeout(timer);
        }
    }
};
