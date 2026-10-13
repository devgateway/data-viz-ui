// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import ThemeList from './ThemeList';
import type { Theme } from './ThemeCard';
import { renderWithProvider } from '../shared/testUtils';

const mocks = vi.hoisted(() => ({ settings: null as { dataset_repository_url?: string } | null }));

vi.mock('../shared/useWpSettings', () => ({
  useWpSettings: () => ({ settings: mocks.settings, loading: false }),
}));

const themes: Theme[] = [
  { id: 1, value: 'Adolescent data', description: 'Tobacco use', countries: [{ id: 10, value: 'Kenya' }, { id: 11, value: 'Zambia' }, { id: 12, value: 'DRC' }], datasetCount: 6, status: 'Active' },
  { id: 2, value: 'Illicit trade', description: 'DRC · South Africa', countries: [], datasetCount: 0, status: 'Coming soon' },
];

afterEach(() => {
  vi.unstubAllGlobals();
  mocks.settings = null;
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
    [1, ['grid-cols-1']],
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

  it('falls back to the dataset_repository_url setting when no api url is given', async () => {
    mocks.settings = { dataset_repository_url: 'https://repo.example.com' };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify([{ id: 3, value: 'From settings', description: '', countries: [], datasetCount: 0, status: 'Active' }]), { status: 200 })));

    renderWithProvider(<ThemeList />);

    await waitFor(() => expect(screen.getByRole('button', { name: /From settings/ })).toBeInTheDocument());
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://repo.example.com/themes');
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

  it('lists themes with no datasets or countries last, keeping the API order within each group', () => {
    const mixed: Theme[] = [
      { id: 1, value: 'Soon A', description: '', countries: [], datasetCount: 0, status: 'Coming soon' },
      { id: 2, value: 'Live A', description: '', countries: [{ id: 10, value: 'Kenya' }], datasetCount: 2, status: 'Active' },
      { id: 3, value: 'Empty active', description: '', countries: [], datasetCount: 0, status: 'Active' },
      { id: 4, value: 'Live B', description: '', countries: [{ id: 11, value: 'DRC' }], datasetCount: 1, status: 'Active' },
    ];

    renderWithProvider(<ThemeList themes={mixed} />);

    const order = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(order).toEqual(['Live A', 'Live B', 'Soon A', 'Empty active']);
  });

  describe('with a category selected', () => {
    const values = [
      { id: 21, categoryId: 1, parentCategoryValueId: null, value: 'Adolescent tobacco use', sortOrder: 1, description: 'Tobacco and nicotine use', wordpressUrl: 'http://localhost/wp/adolescent/', children: [] },
      { id: 22, categoryId: 1, parentCategoryValueId: null, value: 'Illicit trade', sortOrder: 2, description: null, wordpressUrl: null, children: [] },
    ];

    const themeRollups = [{ id: 21, value: 'Adolescent tobacco use', description: '', countries: [{ id: 10, value: 'Kenya' }, { id: 11, value: 'DRC' }], datasetCount: 6, status: 'Active' }];
    const stubValuesAndThemes = () =>
      vi.stubGlobal('fetch', vi.fn().mockImplementation(async (request: Request) =>
        new Response(JSON.stringify(request.url.endsWith('/themes') ? themeRollups : values), { status: 200 })));
    const requestedUrls = () => vi.mocked(fetch).mock.calls.map(([request]) => (request as Request).url);

    it('lists every value of the category by default, from /categories/{id}/values', async () => {
      stubValuesAndThemes();

      renderWithProvider(<ThemeList {...{ 'data-api-url': 'https://example.com', 'data-category-id': '1' }} />);

      await waitFor(() => expect(screen.getByRole('link', { name: /Adolescent tobacco use/ })).toBeInTheDocument());
      expect(screen.getByRole('button', { name: /Illicit trade/ })).toBeInTheDocument();
      expect(requestedUrls()).toContain('https://example.com/categories/1/values');
    });

    it('shows countries and datasets for a value that is also a portal theme, and zeros for one that is not', async () => {
      stubValuesAndThemes();

      renderWithProvider(<ThemeList {...{ 'data-api-url': 'https://example.com', 'data-category-id': '1' }} />);

      await waitFor(() => expect(screen.getByText('6 datasets')).toBeInTheDocument());
      expect(screen.getByText('2 countries')).toBeInTheDocument();
      expect(screen.getAllByText('Active')).toHaveLength(2);
      expect(screen.getByRole('button', { name: /Illicit trade/ })).toHaveTextContent('0 countries');
      expect(screen.getByRole('button', { name: /Illicit trade/ })).toHaveTextContent('0 datasets');
    });

    it('takes the status from the matching portal theme, so a theme without datasets shows as coming soon', async () => {
      vi.stubGlobal('fetch', vi.fn().mockImplementation(async (request: Request) =>
        new Response(JSON.stringify(request.url.endsWith('/themes')
          ? [{ id: 22, value: 'Illicit trade', description: '', countries: [], datasetCount: 0, status: 'Coming soon' }]
          : values), { status: 200 })));

      renderWithProvider(<ThemeList {...{ 'data-api-url': 'https://example.com', 'data-category-id': '1' }} />);

      await waitFor(() => expect(screen.getByLabelText('Illicit trade — coming soon')).toBeInTheDocument());
      expect(screen.getByText('Coming soon')).toBeInTheDocument();
    });

    it('shows only the selected values when show-all is off', async () => {
      stubValuesAndThemes();

      renderWithProvider(
        <ThemeList {...{ 'data-api-url': 'https://example.com', 'data-category-id': '1', 'data-show-all': 'false', 'data-value-ids': '[22]' }} />
      );

      await waitFor(() => expect(screen.getByRole('button', { name: /Illicit trade/ })).toBeInTheDocument());
      expect(screen.queryByRole('link', { name: /Adolescent tobacco use/ })).not.toBeInTheDocument();
    });

    it('shows every value when show-all is off but nothing is selected', async () => {
      stubValuesAndThemes();

      renderWithProvider(
        <ThemeList {...{ 'data-api-url': 'https://example.com', 'data-category-id': '1', 'data-show-all': 'false' }} />
      );

      await waitFor(() => expect(screen.getByRole('button', { name: /Illicit trade/ })).toBeInTheDocument());
      expect(screen.getByRole('link', { name: /Adolescent tobacco use/ })).toBeInTheDocument();
    });
  });
});
