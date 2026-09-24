// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import DatasetLicense from './DatasetLicense';
import { renderWithProvider } from '../shared/testUtils';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DatasetLicense', () => {
  it('fetches the base apiUrl and renders the license name and text', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ licenseName: 'CC BY 4.0', licenseText: 'You may use, share, and adapt this data.' }), { status: 200 }))
    );

    renderWithProvider(<DatasetLicense apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('CC BY 4.0')).toBeInTheDocument());
    expect(screen.getByText('You may use, share, and adapt this data.')).toBeInTheDocument();
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/datasets/1');
  });

  it('renders nothing when there is no license name', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({}), { status: 200 })));

    const { container } = renderWithProvider(<DatasetLicense apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 401 })));

    const { container } = renderWithProvider(<DatasetLicense apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });

  it('fetches using data-api-url attribute when provided', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ licenseName: 'CC BY 4.0', licenseText: 'You may use, share, and adapt this data.' }), { status: 200 }))
    );

    renderWithProvider(<DatasetLicense data-api-url="https://example.com/datasets/2" />);

    await waitFor(() => expect(screen.getByText('CC BY 4.0')).toBeInTheDocument());
    expect(screen.getByText('You may use, share, and adapt this data.')).toBeInTheDocument();
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/datasets/2');
  });

  it('renders the license name badge but no text paragraph when licenseText is absent', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ licenseName: 'CC BY 4.0' }), { status: 200 }))
    );

    const { container } = renderWithProvider(<DatasetLicense apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('CC BY 4.0')).toBeInTheDocument());
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });
});
