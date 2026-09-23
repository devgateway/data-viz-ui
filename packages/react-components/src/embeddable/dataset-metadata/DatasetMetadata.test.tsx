// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import DatasetMetadata from './DatasetMetadata';
import type { DatasetMetadataEntry } from './DatasetMetadata';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DatasetMetadata', () => {
  it('fetches metadata from {apiUrl}/metadata and renders label/value pairs', async () => {
    const entries: DatasetMetadataEntry[] = [{ label: 'Collection dates', value: 'Jan-Mar 2024' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => entries }));

    render(<DatasetMetadata apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('Collection dates')).toBeInTheDocument());
    expect(screen.getByText('Jan-Mar 2024')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('https://example.com/datasets/1/metadata');
  });

  it('accepts "key" as an alias for "label"', async () => {
    const entries: DatasetMetadataEntry[] = [{ key: 'Version', value: '1.2' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => entries }));

    render(<DatasetMetadata apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('Version')).toBeInTheDocument());
    expect(screen.getByText('1.2')).toBeInTheDocument();
  });

  it('skips an entry with no label or key', async () => {
    const entries: DatasetMetadataEntry[] = [{ value: 'orphan value' } as DatasetMetadataEntry];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => entries }));

    render(<DatasetMetadata apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByText('orphan value')).not.toBeInTheDocument();
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401 }));

    const { container } = render(<DatasetMetadata apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(container.querySelectorAll('dt')).toHaveLength(0);
  });

  it('skips an entry with a label but no value', async () => {
    const entries: DatasetMetadataEntry[] = [{ label: 'Empty field', value: undefined } as DatasetMetadataEntry];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => entries }));

    render(<DatasetMetadata apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByText('Empty field')).not.toBeInTheDocument();
  });

  it('reads apiUrl from data-api-url, as passed by the embed gateway', async () => {
    const entries: DatasetMetadataEntry[] = [{ label: 'Collection dates', value: 'Jan-Mar 2024' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => entries }));

    render(<DatasetMetadata {...{ 'data-api-url': 'https://example.com/datasets/1' }} />);

    await waitFor(() => expect(screen.getByText('Collection dates')).toBeInTheDocument());
    expect(fetch).toHaveBeenCalledWith('https://example.com/datasets/1/metadata');
  });
});
