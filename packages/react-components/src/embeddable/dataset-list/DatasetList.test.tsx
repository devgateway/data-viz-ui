// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import DatasetList from './DatasetList';
import type { LatestDatasetItem } from './DatasetListItem';
import { renderWithProvider } from '../shared/testUtils';

const datasets: LatestDatasetItem[] = [
  { id: 1, name: 'DaYTA DRC, 2023–2024', createdAt: '2024-06-01', recordCount: 4218, fileCount: 12, licenseName: 'CC BY 4.0', doi: '10.5281/zenodo.11234567', countries: [] },
  { id: 2, name: 'DaYTA Kenya, 2023–2024', createdAt: '2024-05-01', recordCount: 3000, fileCount: 8, licenseName: 'CC BY 4.0', doi: '10.5281/zenodo.11234568', countries: [] },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DatasetList', () => {
  it('renders a row for each dataset it is given directly', () => {
    renderWithProvider(<DatasetList datasets={datasets} />);

    expect(screen.getByText('DaYTA DRC, 2023–2024')).toBeInTheDocument();
    expect(screen.getByText('DaYTA Kenya, 2023–2024')).toBeInTheDocument();
  });

  it('renders the "view all" link with the given label and url', () => {
    renderWithProvider(<DatasetList datasets={datasets} viewAllLabel="View all DaYTA data sets" viewAllUrl="/datasets" />);

    expect(screen.getByRole('link', { name: 'View all DaYTA data sets' })).toHaveAttribute('href', '/datasets');
  });

  it('renders the "view all" label as plain text when no url is given', () => {
    renderWithProvider(<DatasetList datasets={datasets} viewAllLabel="View all DaYTA data sets" />);

    expect(screen.getByText('View all DaYTA data sets')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'View all DaYTA data sets' })).not.toBeInTheDocument();
  });

  it('fetches datasets from apiUrl instead of using the datasets prop', async () => {
    const fetched: LatestDatasetItem[] = [{ id: 3, name: 'From API', createdAt: '2024-01-01', fileCount: 0, countries: [] }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(fetched), { status: 200 })));

    renderWithProvider(<DatasetList apiUrl="https://example.com" datasets={datasets} />);

    await waitFor(() => expect(screen.getByText('From API')).toBeInTheDocument());
    expect(screen.queryByText('DaYTA DRC, 2023–2024')).not.toBeInTheDocument();
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/datasets/latest');
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 500 })));

    renderWithProvider(<DatasetList apiUrl="https://example.com" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByText(/DaYTA/)).not.toBeInTheDocument();
  });

  it('reads api url and view-all fields from data-* attribute props, as passed by the embed gateway', async () => {
    const fetched: LatestDatasetItem[] = [{ id: 3, name: 'From API', createdAt: '2024-01-01', fileCount: 0, countries: [] }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(fetched), { status: 200 })));

    renderWithProvider(
      <DatasetList
        {...{
          'data-api-url': 'https://example.com',
          'data-view-all-label': 'See everything',
          'data-view-all-url': '/all-data',
        }}
      />
    );

    await waitFor(() => expect(screen.getByText('From API')).toBeInTheDocument());
    expect(screen.getByRole('link', { name: 'See everything' })).toHaveAttribute('href', '/all-data');
  });
});
