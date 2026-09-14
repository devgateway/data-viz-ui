import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { WordPressProvider, useWordPress, useWPClient } from './WordPressContext';
import { WPClient, createWordPressClient } from '../client/WPClient';
import { WPConfigError } from '../client/errors';

// This whole file runs under vitest's default Node environment - no jsdom,
// no `window`. renderToStaticMarkup here is real server-side rendering, the
// same code path an app's entry-server would exercise.

function CaptureClient({ onRender }: { onRender: (client: WPClient) => void }) {
    onRender(useWPClient());
    return null;
}

describe('WordPressProvider on the server', () => {
    it('renders with an absolute baseUrl config without throwing', () => {
        expect(() =>
            renderToStaticMarkup(
                <WordPressProvider config={{ baseUrl: 'https://example.com/wp' }}>
                    <div />
                </WordPressProvider>
            )
        ).not.toThrow();
    });

    it('constructing with a relative baseUrl does not throw - only calling a client method would', () => {
        // Proves the "legitimate to build during SSR if it never fetches" guarantee.
        expect(() =>
            renderToStaticMarkup(
                <WordPressProvider config={{ baseUrl: '/wp' }}>
                    <div />
                </WordPressProvider>
            )
        ).not.toThrow();
    });

    it('throws when given neither `config` nor `client`', () => {
        // `config`/`client` are both optional in the type (exactly one is required at runtime),
        // so this is a valid call as far as TS is concerned - the check is a runtime guard.
        expect(() =>
            renderToStaticMarkup(
                <WordPressProvider>
                    <div />
                </WordPressProvider>
            )
        ).toThrow(WPConfigError);
    });

    it('exposes a pre-built client (created with createWordPressClient) via context, by identity', () => {
        const client = createWordPressClient({ baseUrl: 'https://example.com/wp' });
        let captured: WPClient | undefined;

        renderToStaticMarkup(
            <WordPressProvider client={client}>
                <CaptureClient onRender={(c) => (captured = c)} />
            </WordPressProvider>
        );

        expect(captured).toBe(client);
    });
});

describe('useWordPress outside a provider', () => {
    function LoneConsumer() {
        useWordPress();
        return null;
    }

    it('throws a clear error', () => {
        expect(() => renderToStaticMarkup(<LoneConsumer />)).toThrow(/must be used within a WordPressProvider/);
    });
});
