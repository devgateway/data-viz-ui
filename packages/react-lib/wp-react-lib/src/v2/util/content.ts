// Pure string manipulation - no DOM/window dependency, so this is already
// safe to run during SSR as-is.

const localReplaceLink = (url: string, locale?: string): string => {
    if (!url) {
        return '';
    }
    const safeLocale = locale || 'en';

    try {
        let pathname = url;

        // If absolute URL, extract pathname and ignore origin
        if (/^https?:\/\//i.test(url)) {
            const parsed = new URL(url);
            pathname = parsed.pathname + (parsed.search || '') + (parsed.hash || '');
        }

        if (!pathname.startsWith('/wp/')) {
            return url; // Not a WordPress path, leave unchanged
        }
        // ensuring access to media library files
        if (pathname.startsWith('/wp/wp-content')) {
            return url;
        }

        const afterWp = pathname.slice(3); // remove '/wp'

        if (!afterWp.startsWith('/' + safeLocale)) {
            return '/' + safeLocale + afterWp;
        }

        return afterWp;
    } catch {
        return url;
    }
};

export const replaceLink = (url: string | undefined, locale?: string): string => {
    if (!url) {
        return '';
    }
    return localReplaceLink(url, locale);
};

export const replaceHTMLinks = (html: string, locale?: string): string => {
    // Match both absolute (http/https) and relative WP links in a single pass
    const linkRegex = /href\s*=\s*(['"])(https?:\/\/.*?|\/wp\/.*?)\1/gi;

    let newHtml = html;
    let match: RegExpExecArray | null;
    while ((match = linkRegex.exec(html)) !== null) {
        const href = match[2];
        const newLink = localReplaceLink(href, locale);
        if (newLink !== href) {
            newHtml = newHtml.replaceAll(href, newLink);
        }
    }
    return newHtml;
};

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
