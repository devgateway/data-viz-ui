// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DatasetListItem from './DatasetListItem';
import type { LatestDatasetItem } from './DatasetListItem';

const dataset: LatestDatasetItem = {
  id: 1,
  name: 'DaYTA Democratic Republic of the Congo, 2023–2024',
  createdAt: '2024-06-01T00:00:00Z',
  recordCount: 4218,
  fileCount: 12,
  licenseName: 'CC BY 4.0',
  doi: '10.5281/zenodo.11234567',
  countries: [],
};

describe('DatasetListItem', () => {
  it('renders the dataset details', () => {
    render(<DatasetListItem dataset={dataset} />);

    expect(screen.getByText('DaYTA Democratic Republic of the Congo, 2023–2024')).toBeInTheDocument();
    expect(screen.getByText('4218 records · 12 files · CC BY 4.0')).toBeInTheDocument();
    expect(screen.getByText('2024-06-01')).toBeInTheDocument();
    expect(screen.getByText('10.5281/zenodo.11234567')).toBeInTheDocument();
  });

  it('always links to the dataset route', () => {
    render(<DatasetListItem dataset={dataset} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/datasets/1');
  });

  it('shows a dash when recordCount is absent', () => {
    render(<DatasetListItem dataset={{ ...dataset, recordCount: undefined }} />);

    expect(screen.getByText('— records · 12 files · CC BY 4.0')).toBeInTheDocument();
  });
});
