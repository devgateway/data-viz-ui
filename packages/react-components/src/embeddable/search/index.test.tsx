// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Search from './index';

const renderSearch = (props: Record<string, unknown> = {}) => {
  const router = createMemoryRouter(
    [
      { path: '/', element: <Search {...props} /> },
      { path: '/results', element: <div>Results page</div> },
    ],
    { initialEntries: ['/'] },
  );
  render(<RouterProvider router={router} />);
  return router;
};

describe('Search', () => {
  it('renders the placeholder and a Search button', () => {
    renderSearch({ 'data-placeholder': 'Search datasets', 'data-redirect-url': '/results' });

    expect(screen.getByPlaceholderText('Search datasets')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders a GET form to the configured redirect page, with the query field named q', () => {
    renderSearch({ 'data-redirect-url': '/results' });

    const form = screen.getByRole('searchbox').closest('form')!;
    expect(form).toHaveAttribute('method', 'get');
    expect(screen.getByRole('searchbox')).toHaveAttribute('name', 'q');
  });

  it('navigates to the redirect page with the query on submit', async () => {
    const router = renderSearch({ 'data-redirect-url': '/results' });

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'poverty data' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await screen.findByText('Results page');
    expect(router.state.location.pathname).toBe('/results');
    expect(router.state.location.search).toBe('?q=poverty+data');
  });

  it('does not navigate when no redirect page is configured', () => {
    const router = renderSearch({});

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(router.state.location.pathname).toBe('/');
  });

  it('does not navigate while in editing/preview mode', () => {
    const router = renderSearch({ 'data-redirect-url': '/results', editing: true });

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(router.state.location.pathname).toBe('/');
  });

  it('applies the button color to the submit button', () => {
    renderSearch({ 'data-redirect-url': '/results', 'data-button-color': '#123456' });

    expect(screen.getByRole('button', { name: 'Search' })).toHaveStyle({ backgroundColor: '#123456' });
  });

  it.each([
    ['sm', 'max-w-sm'],
    ['normal', 'max-w-lg'],
    ['lg', 'max-w-2xl'],
  ] as const)('applies the %s width class', (width, expectedClass) => {
    renderSearch({ 'data-redirect-url': '/results', 'data-width': width });

    expect(screen.getByRole('searchbox').closest('form')).toHaveClass(expectedClass);
  });

  it('defaults to the normal width when none is given', () => {
    renderSearch({ 'data-redirect-url': '/results' });

    expect(screen.getByRole('searchbox').closest('form')).toHaveClass('max-w-lg');
  });
});
