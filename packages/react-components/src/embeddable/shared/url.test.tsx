import { describe, expect, it } from 'vitest';
import { joinApiUrl } from './url';

describe('joinApiUrl', () => {
  it('joins a base and a path with exactly one slash', () => {
    expect(joinApiUrl('https://example.com/datasets/1', 'files')).toBe('https://example.com/datasets/1/files');
  });

  it('normalizes a trailing slash on the base', () => {
    expect(joinApiUrl('https://example.com/datasets/1/', 'files')).toBe('https://example.com/datasets/1/files');
  });

  it('normalizes a leading slash on the path', () => {
    expect(joinApiUrl('https://example.com/datasets/1', '/files')).toBe('https://example.com/datasets/1/files');
  });

  it('returns the base unchanged (minus any trailing slash) when no path is given', () => {
    expect(joinApiUrl('https://example.com/datasets/1/')).toBe('https://example.com/datasets/1');
    expect(joinApiUrl('https://example.com/datasets/1')).toBe('https://example.com/datasets/1');
  });
});
