// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import DatasetCitation from './DatasetCitation';
import { renderWithProvider } from '../shared/testUtils';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DatasetCitation', () => {
  it('fetches the base apiUrl and renders both citation formats', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ citationApa: 'APA citation text', citationBibtex: '@misc{bibtex citation}' }), { status: 200 }))
    );

    renderWithProvider(<DatasetCitation apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('APA citation text')).toBeInTheDocument());
    expect(screen.getByText('@misc{bibtex citation}')).toBeInTheDocument();
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/datasets/1');
  });

  it('renders a labeled radio toggle with APA selected by default', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ citationApa: 'apa', citationBibtex: 'bibtex' }), { status: 200 }))
    );

    renderWithProvider(<DatasetCitation apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByLabelText('APA')).toBeChecked());
    expect(screen.getByLabelText('BibTeX')).not.toBeChecked();
  });

  it("renders one copy button per format, each with that format's own text", async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ citationApa: 'apa text', citationBibtex: 'bibtex text' }), { status: 200 }))
    );

    renderWithProvider(<DatasetCitation apiUrl="https://example.com/datasets/1" />);

    const copyButtons = await waitFor(() => screen.getAllByRole('button', { name: 'Copy citation' }));
    expect(copyButtons).toHaveLength(2);
    expect(copyButtons[0]).toHaveAttribute('data-copy-text', 'apa text');
    expect(copyButtons[1]).toHaveAttribute('data-copy-text', 'bibtex text');
  });

  it('renders nothing when there is no citation data at all', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({}), { status: 200 })));

    const { container } = renderWithProvider(<DatasetCitation apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 401 })));

    const { container } = renderWithProvider(<DatasetCitation apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });

  it('fetches the base apiUrl via data-api-url prop when provided', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ citationApa: 'APA text', citationBibtex: 'BibTeX text' }), { status: 200 }))
    );

    renderWithProvider(<DatasetCitation data-api-url="https://example.com/datasets/2" />);

    await waitFor(() => expect(screen.getByText('APA text')).toBeInTheDocument());
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/datasets/2');
  });

  it('renders nothing when neither apiUrl nor data-api-url prop is provided', async () => {
    const { container } = renderWithProvider(<DatasetCitation />);

    expect(container).toBeEmptyDOMElement();
  });
});
