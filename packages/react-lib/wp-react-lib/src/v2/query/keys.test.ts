import { describe, expect, it } from 'vitest';
import { wpQueryKeys } from './keys';

describe('wpQueryKeys', () => {
    it('prefixes every key with "wp" so bulk invalidation works', () => {
        expect(wpQueryKeys.posts()).toEqual(['wp', 'posts', {}]);
        expect(wpQueryKeys.settings('en')).toEqual(['wp', 'settings', 'en', undefined]);
    });

    it('produces distinct keys for distinct params, and equal keys for equal params', () => {
        expect(wpQueryKeys.posts({ slug: 'a' })).not.toEqual(wpQueryKeys.posts({ slug: 'b' }));
        expect(wpQueryKeys.posts({ slug: 'a' })).toEqual(wpQueryKeys.posts({ slug: 'a' }));
    });

    it('taxonomy/menu keys include name and locale positionally, for stable prefix matching', () => {
        expect(wpQueryKeys.taxonomy('categories', 'en')).toEqual(['wp', 'taxonomy', 'categories', 'en']);
        expect(wpQueryKeys.menu('main', undefined)).toEqual(['wp', 'menu', 'main', undefined]);
    });
});
