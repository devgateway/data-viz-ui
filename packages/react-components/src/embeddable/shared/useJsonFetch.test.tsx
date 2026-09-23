// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useJsonFetch } from './useJsonFetch';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useJsonFetch', () => {
  it('returns the fallback and does not fetch when no url is given', () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    const { result } = renderHook(() => useJsonFetch<string[]>(undefined, []));

    expect(result.current).toEqual([]);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('fetches the url and returns the parsed JSON on success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ['a', 'b'] }));

    const { result } = renderHook(() => useJsonFetch<string[]>('https://example.com/items', []));

    await waitFor(() => expect(result.current).toEqual(['a', 'b']));
    expect(fetch).toHaveBeenCalledWith('https://example.com/items');
  });

  it('returns the fallback when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401 }));

    const { result } = renderHook(() => useJsonFetch<string[]>('https://example.com/items', ['fallback']));

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(result.current).toEqual(['fallback']);
  });

  it('returns the fallback when fetch rejects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));

    const { result } = renderHook(() => useJsonFetch<string[]>('https://example.com/items', ['fallback']));

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(result.current).toEqual(['fallback']);
  });
});
