import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Content } from './Content';
import { EmbedProvider } from '../embed/EmbedContext';
import type { Post } from '../../post-type';

// No jsdom in this file - vitest's default Node environment has no `window`,
// so this is real server-side rendering, not a simulation of it.

const post = {
    id: 42,
    date: '2024-01-01T00:00:00',
    slug: 'hello-world',
    title: { rendered: 'Hello <b>World</b>' },
    content: { rendered: '<p>Body <a href="/wp/about">link</a></p>' },
    parent: 0,
} as unknown as Post;

describe('Content under SSR (renderToStaticMarkup, no window)', () => {
    it('renders post title/content HTML without a window, wrapped in EmbeddedGateway, with no EmbedProvider', () => {
        const html = renderToStaticMarkup(<Content post={post} showTitle showContent locale="en" />);

        expect(html).toContain('Hello <b>World</b>');
        expect(html).toContain('Body <a href="/en/about">link</a>');
    });

    it('still renders correctly with an EmbedProvider present (the embed mount itself never runs - useEffect never fires during SSR)', () => {
        const html = renderToStaticMarkup(
            <EmbedProvider registry={{}}>
                <Content post={post} showContent locale="en" />
            </EmbedProvider>
        );

        expect(html).toContain('Body');
    });

    it('renders the loading fallback (not null) when post is not yet available and showLoading is set', () => {
        const html = renderToStaticMarkup(<Content post={null} showLoading />);
        expect(html).toBe('Loading');
    });

    it('renders nothing when post is not yet available and showLoading is not set', () => {
        const html = renderToStaticMarkup(<Content post={null} />);
        expect(html).toBe('');
    });
});
