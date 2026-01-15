import DOMPurify from 'dompurify';
import {decode as decodeHtmlEntities} from 'html-entities';

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
    if (!html) return '';
    return decodeHtmlEntities(html);
}

export const decodeHtmlEntitiesToHtml = (html: string) => {
    if (!html) return '';
    const sanitized = decodeHtmlEntities(html);
    return sanitized;
}

export function stringToArray(str: string) {
    return str.replace(/^\[|\]$/g, '').split(',').map(item => {
      const trimmed = item.trim();
      // Try to convert to number if it's numeric
      const num = Number(trimmed);
      return isNaN(num) ? trimmed : num;
    });
  }
