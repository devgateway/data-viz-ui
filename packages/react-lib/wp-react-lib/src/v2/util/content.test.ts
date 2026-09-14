import { describe, expect, it } from 'vitest';
import { removePatternBrackets, replaceHTMLinks, replaceLink, translate } from './content';

describe('replaceLink', () => {
    it('returns an empty string for a falsy url', () => {
        expect(replaceLink(undefined)).toBe('');
        expect(replaceLink('')).toBe('');
    });

    it('leaves a non-WP path unchanged', () => {
        expect(replaceLink('/about', 'en')).toBe('/about');
    });

    it('leaves media library links unchanged', () => {
        expect(replaceLink('/wp/wp-content/uploads/photo.jpg', 'en')).toBe('/wp/wp-content/uploads/photo.jpg');
    });

    it('rewrites a /wp path to /<locale> and strips the /wp prefix', () => {
        expect(replaceLink('/wp/about', 'fr')).toBe('/fr/about');
    });

    it('leaves an already-localized path unchanged', () => {
        expect(replaceLink('/wp/fr/about', 'fr')).toBe('/fr/about');
    });

    it('extracts the pathname from an absolute WP url', () => {
        expect(replaceLink('https://example.com/wp/about?x=1', 'fr')).toBe('/fr/about?x=1');
    });

    it('defaults to "en" when no locale is given', () => {
        expect(replaceLink('/wp/about')).toBe('/en/about');
    });
});

describe('replaceHTMLinks', () => {
    it('rewrites every WP href in the HTML', () => {
        const html = '<a href="/wp/about">About</a> and <a href="https://example.com/wp/contact">Contact</a>';
        expect(replaceHTMLinks(html, 'fr')).toBe('<a href="/fr/about">About</a> and <a href="/fr/contact">Contact</a>');
    });

    it('leaves non-WP hrefs untouched', () => {
        const html = '<a href="https://external.com/page">External</a>';
        expect(replaceHTMLinks(html, 'fr')).toBe(html);
    });
});

describe('removePatternBrackets', () => {
    it('returns null for null/undefined input', () => {
        expect(removePatternBrackets(null)).toBeNull();
        expect(removePatternBrackets(undefined)).toBeNull();
    });

    it('strips the [:xx]/[:] delimiter markers but keeps the enclosed text (translate() already picked the locale)', () => {
        expect(removePatternBrackets('before [:fr]bonjour[:] after')).toBe('before bonjour after');
    });

    it('leaves text with no pattern unchanged', () => {
        expect(removePatternBrackets('plain text')).toBe('plain text');
    });
});

describe('translate', () => {
    it('returns null for null/undefined input', () => {
        expect(translate(null)).toBeNull();
        expect(translate(undefined)).toBeNull();
    });

    it('extracts the segment for the requested locale, leaving other locale segments untouched', () => {
        const str = '[:en]Hello[:][:fr]Bonjour[:]';
        expect(translate(str, 'fr')).toBe('[:en]Hello[:]Bonjour');
    });

    it('returns the original string unchanged when there is no pattern', () => {
        expect(translate('plain text', 'fr')).toBe('plain text');
    });
});
