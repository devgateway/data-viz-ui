// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import DatasetLicense from './DatasetLicense';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DatasetLicense', () => {
  it('fetches the base apiUrl and renders the license name and text', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ licenseName: 'CC BY 4.0', licenseText: 'You may use, share, and adapt this data.' }),
      })
    );

    render(<DatasetLicense apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('CC BY 4.0')).toBeInTheDocument());
    expect(screen.getByText('You may use, share, and adapt this data.')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('https://example.com/datasets/1');
  });

  it('renders nothing when there is no license name', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));

    const { container } = render(<DatasetLicense apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401 }));

    const { container } = render(<DatasetLicense apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });

  it('fetches using data-api-url attribute when provided', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ licenseName: 'CC BY 4.0', licenseText: 'You may use, share, and adapt this data.' }),
      })
    );

    render(<DatasetLicense data-api-url="https://example.com/datasets/2" />);

    await waitFor(() => expect(screen.getByText('CC BY 4.0')).toBeInTheDocument());
    expect(screen.getByText('You may use, share, and adapt this data.')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('https://example.com/datasets/2');
  });

  it('renders the license name badge but no text paragraph when licenseText is absent', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ licenseName: 'CC BY 4.0' }),
      })
    );

    const { container } = render(<DatasetLicense apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('CC BY 4.0')).toBeInTheDocument());
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });
});
