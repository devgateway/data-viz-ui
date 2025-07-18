import DOMPurify from 'dompurify';

// Utility functions to safely convert props to proper types
export const toBoolean = (value: any): boolean => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value === 'true';
    return false;
};

export const toNumber = (value: any): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseInt(value) || 0;
    return 0;
};

export const uriStringToArray = (value: string | string[]): any[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
        const decoded = decodeURIComponent(value);
        if (decoded && decoded !== "undefined") {
            return JSON.parse(decoded);
        }
    }
    return [];
}

export const decodeHtmlEntitiesToText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent;
}

export const decodeHtmlEntitiesToHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const sanitized = DOMPurify.sanitize(doc.documentElement.innerHTML);
    return sanitized;
}