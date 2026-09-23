// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import ThemeList from './ThemeList';
import type { Theme } from './ThemeCard';

const themes: Theme[] = [
  { id: 'adolescent-data', title: 'Adolescent data', description: 'Tobacco use', countries: 3, datasets: 6, active: true },
  { id: 'illicit-trade', title: 'Illicit trade', description: 'DRC · South Africa', active: false },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ThemeList', () => {
  it('renders a card for each theme it is given directly', () => {
    render(<ThemeList themes={themes} />);

    expect(screen.getByRole('button', { name: /Adolescent data/ })).toBeInTheDocument();
    expect(screen.getByLabelText('Illicit trade — coming soon')).toBeInTheDocument();
  });

  it('defaults to a 4-column grid', () => {
    const { container } = render(<ThemeList themes={themes} />);

    expect(container.firstElementChild).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
  });

  it.each([
    [2, ['grid-cols-1', 'sm:grid-cols-2']],
    [3, ['grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3']],
    [4, ['grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4']],
  ] as const)('applies the grid classes for %i columns', (columns, expectedClasses) => {
    const { container } = render(<ThemeList themes={themes} columns={columns} />);

    expect(container.firstElementChild).toHaveClass(...expectedClasses);
  });

  it('passes theme selection through to onSelect', () => {
    const onSelect = vi.fn();
    render(<ThemeList themes={themes} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: /Adolescent data/ }));

    expect(onSelect).toHaveBeenCalledWith('adolescent-data');
  });

  it('fetches themes from apiUrl instead of using the themes prop', async () => {
    const fetched: Theme[] = [{ id: 'from-api', title: 'From API', description: 'Fetched theme', active: true }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => fetched }));

    render(<ThemeList apiUrl="https://example.com/themes" themes={themes} />);

    await waitFor(() => expect(screen.getByRole('button', { name: /From API/ })).toBeInTheDocument());
    expect(screen.queryByRole('button', { name: /Adolescent data/ })).not.toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('https://example.com/themes');
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    render(<ThemeList apiUrl="https://example.com/themes" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('reads the api url and columns from data-* attribute props, as passed by the embed gateway', async () => {
    const fetched: Theme[] = [{ id: 'from-api', title: 'From API', description: 'Fetched theme', active: true }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => fetched }));

    const { container } = render(<ThemeList {...{ 'data-api-url': 'https://example.com/themes', 'data-columns': '2' }} />);

    await waitFor(() => expect(screen.getByRole('button', { name: /From API/ })).toBeInTheDocument());
    expect(container.firstElementChild).toHaveClass('grid-cols-1', 'sm:grid-cols-2');
  });
});
