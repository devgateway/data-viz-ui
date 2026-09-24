// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import DatasetMetadata from './DatasetMetadata';
import type { DatasetMetadataEntry } from './DatasetMetadata';
import { renderWithProvider } from '../shared/testUtils';

const detail = (metadata: DatasetMetadataEntry[]) => ({
  id: 1, name: 'Test', createdAt: '2024-01-01', status: 'Published', files: [], resources: [], metadata,
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DatasetMetadata', () => {
  it('fetches the dataset detail and renders metadata label/value pairs', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(detail([{ label: 'Collection dates', value: 'Jan-Mar 2024' }])), { status: 200 })));

    renderWithProvider(<DatasetMetadata apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('Collection dates')).toBeInTheDocument());
    expect(screen.getByText('Jan-Mar 2024')).toBeInTheDocument();
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/datasets/1');
  });

  it('skips an entry with no label', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(detail([{ value: 'orphan value' } as DatasetMetadataEntry])), { status: 200 })));

    renderWithProvider(<DatasetMetadata apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByText('orphan value')).not.toBeInTheDocument();
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 401 })));

    const { container } = renderWithProvider(<DatasetMetadata apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(container.querySelectorAll('dt')).toHaveLength(0);
  });

  it('skips an entry with a label but no value', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(detail([{ label: 'Empty field', value: undefined } as unknown as DatasetMetadataEntry])), { status: 200 })));

    renderWithProvider(<DatasetMetadata apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByText('Empty field')).not.toBeInTheDocument();
  });

  it('reads apiUrl from data-api-url, as passed by the embed gateway', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(detail([{ label: 'Collection dates', value: 'Jan-Mar 2024' }])), { status: 200 })));

    renderWithProvider(<DatasetMetadata {...{ 'data-api-url': 'https://example.com/datasets/1' }} />);

    await waitFor(() => expect(screen.getByText('Collection dates')).toBeInTheDocument());
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/datasets/1');
  });
});
