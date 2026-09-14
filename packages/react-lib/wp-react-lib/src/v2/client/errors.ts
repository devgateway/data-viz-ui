export class WPConfigError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'WPConfigError';
    }
}

export interface WPApiErrorOptions {
    status?: number;
    url: string;
    body?: unknown;
}

export class WPApiError extends Error {
    readonly status?: number;
    readonly url: string;
    readonly body?: unknown;

    constructor(message: string, options: WPApiErrorOptions) {
        super(message);
        this.name = 'WPApiError';
        this.status = options.status;
        this.url = options.url;
        this.body = options.body;
    }
}

export class WPTimeoutError extends WPApiError {
    constructor(url: string, timeout: number) {
        super(`WordPress request to ${url} timed out after ${timeout}ms`, { url });
        this.name = 'WPTimeoutError';
    }
}
