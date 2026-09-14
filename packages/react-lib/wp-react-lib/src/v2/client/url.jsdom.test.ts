// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { resolveBaseUrl } from './url';

describe('resolveBaseUrl (browser)', () => {
    it('accepts a relative baseUrl when `window` is present', () => {
        expect(typeof window).toBe('object');
        expect(resolveBaseUrl('/wp/')).toBe('/wp');
    });
});
