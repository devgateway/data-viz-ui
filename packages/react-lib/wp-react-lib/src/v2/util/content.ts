// Pure string manipulation - no DOM/window dependency, so this is already
// safe to run during SSR as-is.

/**
 * Rewrites a WordPress URL to the portal's own path: strips the `/wp` prefix and, when a
 * `locale` is given, prefixes `/<locale>`. Media/admin/API paths (`/wp/wp-...`) and
 * non-WordPress URLs are left alone.
 */
const localReplaceLink = (url: string, locale?: string): string => {
    const match = url.match(/^(?:https?:\/\/[^/]+)?\/wp(\/[^?#]*)?([?#].*)?$/i);
    if (!match) {
        return url;
    }

    const [, path = '/', rest = ''] = match;
    if (path.startsWith('/wp-')) {
        return url;
    }

    const prefix = locale && !(path === `/${locale}` || path.startsWith(`/${locale}/`)) ? `/${locale}` : '';
    return `${prefix}${path}${rest}`;
};

export const replaceLink = (url: string | undefined, locale?: string): string => {
    if (!url) {
        return '';
    }
    return localReplaceLink(url, locale);
};

/** Rewrites every `href` and `data-*-url` attribute (embeddable props) that points at WordPress. */
export const replaceHTMLinks = (html: string, locale?: string): string =>
    html.replace(
        /(\b(?:href|data-[\w-]*url)\s*=\s*)(['"])(https?:\/\/.*?|\/wp(?:\/.*?)?)\2/gi,
        (_match, attr: string, quote: string, url: string) => `${attr}${quote}${localReplaceLink(url, locale)}${quote}`,
    );

export const removePatternBrackets = (html: string | null | undefined): string | null => {
    if (!html) {
        return null;
    }
    const bracketReplacement = `###${Math.random()}###`; // A unique string to mark replacements
    const regex = new RegExp(`\\[${bracketReplacement}.*?]`, 'ig'); // No lookbehind, matches pattern within square brackets

    return html
        .replaceAll('[:', `[${bracketReplacement}`) // Use square brackets to match regex pattern
        .replaceAll(regex, '') // Remove entire pattern inside square brackets
        .replaceAll(bracketReplacement, ''); // Clean up any remaining placeholders
};

/**
 * WP_Multilang doesn't support pattern translation; this extracts the
 * `[:<locale>]...[:]` segment for the given locale, falling back to the
 * original string when there's no matching pattern.
 */
export const translate = (str: string | null | undefined, locale = 'en'): string | null => {
    if (str == null) {
        return null;
    }

    let newStr: string | null = null;
    const matches = str.match(/\[:([a-z])+\]([\s\S]*?)\[:\]/gim);
    if (matches != null) {
        matches.forEach((part) => {
            const regularExpression = new RegExp(`\\[:${locale}\\][\\s\\S]([\\s\\S]*?)\\[:`, 'g');
            const tr = part.match(regularExpression);

            if (tr != null) {
                const translation = tr[0];
                newStr = str.replace(part, translation.substring(5, translation.length - 2));
            }
        });
    }
    return newStr ?? str;
};
