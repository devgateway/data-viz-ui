// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import DatasetFiles from './DatasetFiles';
import type { DatasetFile } from './DatasetFiles';
import { renderWithProvider } from '../shared/testUtils';

const files: DatasetFile[] = [
  { id: 'a', name: 'individual.csv', categoryValueName: 'Individual Dataset', sizeBytes: 36066 },
  { id: 'b', name: 'household.csv', categoryValueName: 'Household Dataset', sizeBytes: 820 },
  { id: 'c', name: 'photo.png', sizeBytes: 448386, type: 'Survey' },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DatasetFiles', () => {
  it('fetches files from {apiUrl}/files and groups them by category', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(files), { status: 200 })));

    renderWithProvider(<DatasetFiles apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('individual.csv')).toBeInTheDocument());
    expect(screen.getByText('Individual Dataset')).toBeInTheDocument();
    expect(screen.getByText('Household Dataset')).toBeInTheDocument();
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/datasets/1/files');
  });

  it('falls back to the type field as a group label when categoryValueName is missing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(files), { status: 200 })));

    renderWithProvider(<DatasetFiles apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('photo.png')).toBeInTheDocument());
    expect(screen.getByText('Survey')).toBeInTheDocument();
  });

  it('falls back to "Files" group label when both categoryValueName and type are missing', async () => {
    const filesWithoutCategory: DatasetFile[] = [
      { id: 'd', name: 'unclassified.txt', sizeBytes: 1024 },
    ];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(filesWithoutCategory), { status: 200 })));

    renderWithProvider(<DatasetFiles apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('unclassified.txt')).toBeInTheDocument());
    expect(screen.getByText('Files')).toBeInTheDocument();
  });

  it('renders a human-readable file size', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(files), { status: 200 })));

    renderWithProvider(<DatasetFiles apiUrl="https://example.com/datasets/1" />);

    // 36066 bytes / 1024 = 35.216... KB, toFixed(1) -> "35.2 KB"
    await waitFor(() => expect(screen.getByText('35.2 KB')).toBeInTheDocument());
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 401 })));

    renderWithProvider(<DatasetFiles apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders a "download all" link built from apiUrl when a label is given', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify([]), { status: 200 })));

    renderWithProvider(<DatasetFiles apiUrl="https://example.com/datasets/1" downloadAllLabel="Download all files (.zip)" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.getByRole('link', { name: 'Download all files (.zip)' })).toHaveAttribute(
      'href',
      'https://example.com/datasets/1/download'
    );
  });

  it('does not render a "download all" link when no label is given', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify([]), { status: 200 })));

    renderWithProvider(<DatasetFiles apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('reads apiUrl and downloadAllLabel from data-* attribute props, as passed by the embed gateway', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(files), { status: 200 })));

    renderWithProvider(
      <DatasetFiles
        {...{ 'data-api-url': 'https://example.com/datasets/1', 'data-download-all-label': 'Get everything' }}
      />
    );

    await waitFor(() => expect(screen.getByText('individual.csv')).toBeInTheDocument());
    expect(screen.getByRole('link', { name: 'Get everything' })).toHaveAttribute(
      'href',
      'https://example.com/datasets/1/download'
    );
  });
});
