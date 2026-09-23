// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import DatasetDoi from './DatasetDoi';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DatasetDoi', () => {
  it('fetches the base apiUrl and renders the DOI as a doi.org link', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ doi: '10.5281/zenodo.11234567' }) }));

    render(<DatasetDoi apiUrl="https://example.com/datasets/1" />);

    await waitFor(() =>
      expect(screen.getByRole('link', { name: /10\.5281\/zenodo\.11234567/ })).toHaveAttribute(
        'href',
        'https://doi.org/10.5281/zenodo.11234567'
      )
    );
    expect(fetch).toHaveBeenCalledWith('https://example.com/datasets/1');
  });

  it('renders a copy button for the DOI url', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ doi: '10.5281/zenodo.11234567' }) }));

    render(<DatasetDoi apiUrl="https://example.com/datasets/1" />);

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Copy' })).toHaveAttribute('data-copy-text', 'https://doi.org/10.5281/zenodo.11234567')
    );
  });

  it('renders nothing when there is no doi', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));

    render(<DatasetDoi apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401 }));

    render(<DatasetDoi apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('fetches using data-api-url attribute when provided', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ doi: '10.5281/zenodo.11234567' }) }));

    render(<DatasetDoi data-api-url="https://example.com/datasets/2" />);

    await waitFor(() =>
      expect(screen.getByRole('link', { name: /10\.5281\/zenodo\.11234567/ })).toHaveAttribute(
        'href',
        'https://doi.org/10.5281/zenodo.11234567'
      )
    );
    expect(fetch).toHaveBeenCalledWith('https://example.com/datasets/2');
  });
});
