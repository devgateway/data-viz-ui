import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { WordPressProvider } from './context/WordPressContext';
import { usePosts } from './hooks/usePosts';
import { Post } from './templates/Post';
import type { Post as PostType } from '../post-type';

// The whole point of this file: vitest's default Node environment has no
// `window`, so renderToStaticMarkup here is real SSR - the same code path
// an app's entry-server.tsx would exercise - not a browser simulation.

const posts = [
    {
        id: 1,
        date: '2024-01-01T00:00:00',
        slug: 'hello-world',
        title: { rendered: 'Hello World' },
        content: { rendered: '<p>Body text</p>' },
        parent: 0,
    } as unknown as PostType,
];

function Page() {
    // Hydrated data, as a route loader would provide it - this is the shape
    // the "relative baseUrl requires an absolute URL for SSR" guard exists
    // for: a real app would pass an absolute baseUrl here during SSR.
    const { data, loading } = usePosts({ slug: 'hello-world', initialData: posts });
    return loading ? <p>Loading</p> : <Post posts={data} />;
}

describe('v2 end-to-end under SSR', () => {
    it('renders provider -> usePosts(initialData) -> Post -> PostContent with no window and no network call', () => {
        const html = renderToStaticMarkup(
            <WordPressProvider config={{ baseUrl: 'https://example.com/wp' }}>
                <Page />
            </WordPressProvider>
        );

        expect(html).toContain('Body text');
        expect(html).not.toContain('Loading');
    });

    it('throws a clear WPConfigError instead of a cryptic fetch failure when baseUrl is relative, has no `origin`, and something actually fetches during SSR', async () => {
        const { createWordPressClient } = await import('./client/WPClient');
        const client = createWordPressClient({ baseUrl: '/wp' });

        await expect(client.getSettings()).rejects.toMatchObject({ name: 'WPConfigError' });
    });

    it('a relative baseUrl (e.g. behind a proxy) also works during SSR once `origin` is configured - e.g. derived from the incoming request', async () => {
        const { createWordPressClient } = await import('./client/WPClient');
        const fetchImpl = (async (_url: string) => new Response(JSON.stringify({ name: 'My Site' }), { status: 200 })) as typeof fetch;

        // Mirrors what a loader gets for free: `new URL(request.url).origin`.
        const request = { url: 'https://my-app.example.com/some/page' };
        const origin = new URL(request.url).origin;

        const client = createWordPressClient({ baseUrl: '/wp', origin, fetch: fetchImpl });

        const { data } = await client.getSettings();
        expect(data).toEqual({ name: 'My Site' });
    });
});
