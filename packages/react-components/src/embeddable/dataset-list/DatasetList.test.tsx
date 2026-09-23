// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import DatasetList from './DatasetList';
import type { Dataset } from './DatasetListItem';

const datasets: Dataset[] = [
  { id: 'drc', surveyTitle: 'DaYTA DRC, 2023–2024', sampleSize: 4218, numFiles: 12, license: 'CC BY 4.0', releaseDate: '2024-06-01', doi: '10.5281/zenodo.11234567' },
  { id: 'kenya', surveyTitle: 'DaYTA Kenya, 2023–2024', sampleSize: 3000, numFiles: 8, license: 'CC BY 4.0', releaseDate: '2024-05-01', doi: '10.5281/zenodo.11234568' },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DatasetList', () => {
  it('renders a row for each dataset it is given directly', () => {
    render(<DatasetList datasets={datasets} />);

    expect(screen.getByText('DaYTA DRC, 2023–2024')).toBeInTheDocument();
    expect(screen.getByText('DaYTA Kenya, 2023–2024')).toBeInTheDocument();
  });

  it('renders the "view all" link with the given label and url', () => {
    render(<DatasetList datasets={datasets} viewAllLabel="View all DaYTA data sets" viewAllUrl="/datasets" />);

    expect(screen.getByRole('link', { name: 'View all DaYTA data sets' })).toHaveAttribute('href', '/datasets');
  });

  it('renders the "view all" label as plain text when no url is given', () => {
    render(<DatasetList datasets={datasets} viewAllLabel="View all DaYTA data sets" />);

    expect(screen.getByText('View all DaYTA data sets')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'View all DaYTA data sets' })).not.toBeInTheDocument();
  });

  it('fetches datasets from apiUrl instead of using the datasets prop', async () => {
    const fetched: Dataset[] = [{ id: 'from-api', surveyTitle: 'From API' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => fetched }));

    render(<DatasetList apiUrl="https://example.com/datasets" datasets={datasets} />);

    await waitFor(() => expect(screen.getByText('From API')).toBeInTheDocument());
    expect(screen.queryByText('DaYTA DRC, 2023–2024')).not.toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('https://example.com/datasets');
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    render(<DatasetList apiUrl="https://example.com/datasets" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByText(/DaYTA/)).not.toBeInTheDocument();
  });

  it('reads api url and view-all fields from data-* attribute props, as passed by the embed gateway', async () => {
    const fetched: Dataset[] = [{ id: 'from-api', surveyTitle: 'From API' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => fetched }));

    render(
      <DatasetList
        {...{
          'data-api-url': 'https://example.com/datasets',
          'data-view-all-label': 'See everything',
          'data-view-all-url': '/all-data',
        }}
      />
    );

    await waitFor(() => expect(screen.getByText('From API')).toBeInTheDocument());
    expect(screen.getByRole('link', { name: 'See everything' })).toHaveAttribute('href', '/all-data');
  });
});
