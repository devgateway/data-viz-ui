// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeCard from './ThemeCard';
import type { Theme } from './ThemeCard';

const activeTheme: Theme = {
  id: 'adolescent-data',
  title: 'Adolescent data',
  description: 'Tobacco and nicotine use among adolescents',
  countries: 3,
  datasets: 6,
  active: true,
};

const inactiveTheme: Theme = {
  id: 'illicit-trade',
  title: 'Illicit trade',
  description: 'DRC · South Africa',
  active: false,
};

describe('ThemeCard', () => {
  it('renders an active theme without a url as a clickable button with its counts', () => {
    render(<ThemeCard theme={activeTheme} />);

    const card = screen.getByRole('button', { name: /Adolescent data/ });
    expect(card).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('3 countries')).toBeInTheDocument();
    expect(screen.getByText('6 datasets')).toBeInTheDocument();
  });

  it('renders an active theme with a url as a link to that url', () => {
    render(<ThemeCard theme={{ ...activeTheme, url: '/themes/adolescent-data' }} />);

    const card = screen.getByRole('link', { name: /Adolescent data/ });
    expect(card).toHaveAttribute('href', '/themes/adolescent-data');
  });

  it('renders an inactive theme as a disabled, labeled card without counts', () => {
    render(<ThemeCard theme={inactiveTheme} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Illicit trade — coming soon')).toBeInTheDocument();
    expect(screen.getByText('Coming soon')).toBeInTheDocument();
    expect(screen.queryByText('countries', { exact: false })).not.toBeInTheDocument();
  });

  it('calls onSelect with the theme id when a button-variant card is clicked', () => {
    const onSelect = vi.fn();
    render(<ThemeCard theme={activeTheme} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: /Adolescent data/ }));

    expect(onSelect).toHaveBeenCalledWith('adolescent-data');
  });

  it('calls onSelect with the theme id when a link-variant card is clicked', () => {
    const onSelect = vi.fn();
    render(<ThemeCard theme={{ ...activeTheme, url: '/themes/adolescent-data' }} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('link', { name: /Adolescent data/ }));

    expect(onSelect).toHaveBeenCalledWith('adolescent-data');
  });

  it('does not require onSelect to render an active card', () => {
    render(<ThemeCard theme={activeTheme} />);

    expect(() => fireEvent.click(screen.getByRole('button', { name: /Adolescent data/ }))).not.toThrow();
  });
});
