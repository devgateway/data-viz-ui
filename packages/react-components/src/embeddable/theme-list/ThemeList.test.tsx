// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import ThemeList from './ThemeList';
import type { Theme } from './ThemeCard';
import { renderWithProvider } from '../shared/testUtils';

const themes: Theme[] = [
  { id: 1, value: 'Adolescent data', description: 'Tobacco use', countries: [{ id: 10, value: 'Kenya' }, { id: 11, value: 'Zambia' }, { id: 12, value: 'DRC' }], datasetCount: 6, status: 'Active' },
  { id: 2, value: 'Illicit trade', description: 'DRC · South Africa', countries: [], datasetCount: 0, status: 'Coming soon' },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ThemeList', () => {
  it('renders a card for each theme it is given directly', () => {
    renderWithProvider(<ThemeList themes={themes} />);

    expect(screen.getByRole('button', { name: /Adolescent data/ })).toBeInTheDocument();
    expect(screen.getByLabelText('Illicit trade — coming soon')).toBeInTheDocument();
  });

  it('defaults to a 4-column grid', () => {
    const { container } = renderWithProvider(<ThemeList themes={themes} />);

    expect(container.firstElementChild).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
  });

  it.each([
    [2, ['grid-cols-1', 'sm:grid-cols-2']],
    [3, ['grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3']],
    [4, ['grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4']],
  ] as const)('applies the grid classes for %i columns', (columns, expectedClasses) => {
    const { container } = renderWithProvider(<ThemeList themes={themes} columns={columns} />);

    expect(container.firstElementChild).toHaveClass(...expectedClasses);
  });

  it('passes theme selection through to onSelect', () => {
    const onSelect = vi.fn();
    renderWithProvider(<ThemeList themes={themes} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: /Adolescent data/ }));

    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('fetches themes from apiUrl instead of using the themes prop', async () => {
    const fetched: Theme[] = [{ id: 3, value: 'From API', description: 'Fetched theme', countries: [], datasetCount: 0, status: 'Active' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(fetched), { status: 200 })));

    renderWithProvider(<ThemeList apiUrl="https://example.com" themes={themes} />);

    await waitFor(() => expect(screen.getByRole('button', { name: /From API/ })).toBeInTheDocument());
    expect(screen.queryByRole('button', { name: /Adolescent data/ })).not.toBeInTheDocument();
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/themes');
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 500 })));

    renderWithProvider(<ThemeList apiUrl="https://example.com" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('reads the api url and columns from data-* attribute props, as passed by the embed gateway', async () => {
    const fetched: Theme[] = [{ id: 3, value: 'From API', description: 'Fetched theme', countries: [], datasetCount: 0, status: 'Active' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(fetched), { status: 200 })));

    const { container } = renderWithProvider(<ThemeList {...{ 'data-api-url': 'https://example.com', 'data-columns': '2' }} />);

    await waitFor(() => expect(screen.getByRole('button', { name: /From API/ })).toBeInTheDocument());
    expect(container.firstElementChild).toHaveClass('grid-cols-1', 'sm:grid-cols-2');
  });

  it('links an active theme to its portal path, not the WordPress URL', () => {
    const withLink: Theme[] = [{ ...themes[0], wordpressUrl: 'http://localhost/wp/adolescent-data/' }];

    renderWithProvider(<ThemeList themes={withLink} />);

    expect(screen.getByRole('link', { name: /Adolescent data/ })).toHaveAttribute('href', '/adolescent-data/');
  });
});
