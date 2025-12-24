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

export const toTitleCase = (str: string) => {
    return str
    .replace(/[-,._!?;:'"()[\]{}]/g, ' ')  // Replace punctuation with spaces
    .replace(/\s+/g, ' ')                 // Replace multiple spaces with single space
    .trim()                               // Remove leading/trailing spaces
    .split(' ')
    .map(word => {
        // If the whole word is already all capitals, keep it as is
        if (word === word.toUpperCase() && word.length > 1) {
            return word;
        }
        // Otherwise, convert to title case
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function stringToArray(str: string) {
    return str.replace(/^\[|\]$/g, '').split(',').map(item => {
      const trimmed = item.trim();
      // Try to convert to number if it's numeric
      const num = Number(trimmed);
      return isNaN(num) ? trimmed : num;
    });
  }
