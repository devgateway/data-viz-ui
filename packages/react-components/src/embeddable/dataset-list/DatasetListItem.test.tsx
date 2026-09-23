// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DatasetListItem from './DatasetListItem';
import type { Dataset } from './DatasetListItem';

const dataset: Dataset = {
  id: 'drc',
  mapSvg: '/flags/drc.svg',
  surveyTitle: 'DaYTA Democratic Republic of the Congo, 2023–2024',
  sampleSize: 4218,
  numFiles: 12,
  license: 'CC BY 4.0',
  releaseDate: '2024-06-01',
  doi: '10.5281/zenodo.11234567',
};

describe('DatasetListItem', () => {
  it('renders the survey details', () => {
    render(<DatasetListItem dataset={dataset} />);

    expect(screen.getByText('DaYTA Democratic Republic of the Congo, 2023–2024')).toBeInTheDocument();
    expect(screen.getByText('4218 adolescents · 12 files · CC BY 4.0')).toBeInTheDocument();
    expect(screen.getByText('2024-06-01')).toBeInTheDocument();
    expect(screen.getByText('10.5281/zenodo.11234567')).toBeInTheDocument();
  });

  it('renders the map image when mapSvg is given', () => {
    const { container } = render(<DatasetListItem dataset={dataset} />);

    // alt="" is intentional (decorative image), so it isn't in the a11y tree.
    expect(container.querySelector('img')).toHaveAttribute('src', '/flags/drc.svg');
  });

  it('links to the dataset url when one is given', () => {
    render(<DatasetListItem dataset={{ ...dataset, url: '/datasets/drc' }} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/datasets/drc');
  });

  it('renders as static text with no url', () => {
    render(<DatasetListItem dataset={dataset} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
