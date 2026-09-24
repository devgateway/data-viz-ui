// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import DatasetDoi from './DatasetDoi';
import { renderWithProvider } from '../shared/testUtils';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DatasetDoi', () => {
  it('fetches the base apiUrl and renders the DOI as a doi.org link', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ doi: '10.5281/zenodo.11234567' }), { status: 200 })));

    renderWithProvider(<DatasetDoi apiUrl="https://example.com/datasets/1" />);

    await waitFor(() =>
      expect(screen.getByRole('link', { name: /10\.5281\/zenodo\.11234567/ })).toHaveAttribute(
        'href',
        'https://doi.org/10.5281/zenodo.11234567'
      )
    );
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/datasets/1');
  });

  it('renders a copy button for the DOI url', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ doi: '10.5281/zenodo.11234567' }), { status: 200 })));

    renderWithProvider(<DatasetDoi apiUrl="https://example.com/datasets/1" />);

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Copy' })).toHaveAttribute('data-copy-text', 'https://doi.org/10.5281/zenodo.11234567')
    );
  });

  it('renders nothing when there is no doi', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({}), { status: 200 })));

    renderWithProvider(<DatasetDoi apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 401 })));

    renderWithProvider(<DatasetDoi apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('fetches using data-api-url attribute when provided', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ doi: '10.5281/zenodo.11234567' }), { status: 200 })));

    renderWithProvider(<DatasetDoi data-api-url="https://example.com/datasets/2" />);

    await waitFor(() =>
      expect(screen.getByRole('link', { name: /10\.5281\/zenodo\.11234567/ })).toHaveAttribute(
        'href',
        'https://doi.org/10.5281/zenodo.11234567'
      )
    );
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/datasets/2');
  });
});
