// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import DatasetResources from './DatasetResources';
import type { DatasetResource } from './DatasetResources';
import { renderWithProvider } from '../shared/testUtils';

const resources: DatasetResource[] = [
  { id: 1, type: 'External site', title: 'Google', url: 'https://google.com' },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DatasetResources', () => {
  it('fetches resources from {apiUrl}/resources and renders each as a link', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(resources), { status: 200 })));

    renderWithProvider(<DatasetResources apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByRole('link', { name: /Google/ })).toBeInTheDocument());
    expect(screen.getByRole('link', { name: /Google/ })).toHaveAttribute('href', 'https://google.com');
    expect((vi.mocked(fetch).mock.lastCall![0] as Request).url).toBe('https://example.com/datasets/1/resources');
  });

  it('shows the resource type as a label', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(resources), { status: 200 })));

    renderWithProvider(<DatasetResources apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByText('External site')).toBeInTheDocument());
  });

  it('renders nothing extra when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 401 })));

    renderWithProvider(<DatasetResources apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('reads apiUrl from data-api-url, as passed by the embed gateway', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(resources), { status: 200 })));

    renderWithProvider(<DatasetResources {...{ 'data-api-url': 'https://example.com/datasets/1' }} />);

    await waitFor(() => expect(screen.getByRole('link', { name: /Google/ })).toBeInTheDocument());
  });

  it('renders a resource without type field and omits the type label', async () => {
    const resourcesWithoutType: DatasetResource[] = [
      { id: 2, title: 'Wikipedia', url: 'https://wikipedia.org' },
    ];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(resourcesWithoutType), { status: 200 })));

    renderWithProvider(<DatasetResources apiUrl="https://example.com/datasets/1" />);

    await waitFor(() => expect(screen.getByRole('link', { name: /Wikipedia/ })).toBeInTheDocument());
    expect(screen.getByRole('link', { name: /Wikipedia/ })).toHaveAttribute('href', 'https://wikipedia.org');
    expect(screen.queryByText(/type/i)).not.toBeInTheDocument();
  });
});
