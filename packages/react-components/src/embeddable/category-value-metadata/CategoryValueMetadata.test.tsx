// @vitest-environment jsdom
import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const mocks = vi.hoisted(() => ({
  useGetCategoryValueMetadataQuery: vi.fn(),
  settings: { dataset_repository_url: 'https://example.com/api' } as { dataset_repository_url?: string } | null,
}))

vi.mock('../shared/api', () => ({
  useGetCategoryValueMetadataQuery: mocks.useGetCategoryValueMetadataQuery,
}))

vi.mock('../shared/useWpSettings', () => ({
  useWpSettings: () => ({ settings: mocks.settings, loading: false }),
}))

import CategoryValueMetadata from './CategoryValueMetadata'
import type { CategoryValueMetadata as CategoryValueMetadataData } from '../shared/types'

const API_URL = 'https://example.com/api'

const metadata: CategoryValueMetadataData = {
  value: 'Example Theme',
  defaults: {
    totalSample: 13686,
    countries: [
      { id: 1, value: 'Country A' },
      { id: 2, value: 'Country B' },
    ],
  },
  entries: [
    { id: 11, key: 'Project', value: 'Example Project', sortOrder: 0 },
    { id: 12, key: 'Funder', value: 'Example Funder Name', sortOrder: 1 },
  ],
}

const loaded = (data: CategoryValueMetadataData = metadata) => ({ data })

/** The label/value pairs as rendered, top to bottom. */
const renderedRows = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('dl > div')).map((row) => [
    row.querySelector('dt')?.textContent,
    row.querySelector('dd')?.textContent,
  ])

beforeEach(() => {
  mocks.settings = { dataset_repository_url: API_URL }
  mocks.useGetCategoryValueMetadataQuery.mockReturnValue(loaded())
})

afterEach(() => vi.clearAllMocks())

describe('CategoryValueMetadata', () => {
  it('renders nothing while the data is loading', () => {
    mocks.useGetCategoryValueMetadataQuery.mockReturnValue({ data: undefined })
    const { container } = render(<CategoryValueMetadata valueId={1} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('titles the card "Study summary" by default', () => {
    render(<CategoryValueMetadata valueId={1} />)

    expect(screen.getByText('Study summary')).toBeInTheDocument()
  })

  it('shows the theme, the calculated rows, then the stored entries in order', () => {
    const { container } = render(<CategoryValueMetadata valueId={1} />)

    expect(renderedRows(container)).toEqual([
      ['Theme', 'Example Theme'],
      ['Countries', 'Country A · Country B'],
      ['Total sample', '13,686'],
      ['Project', 'Example Project'],
      ['Funder', 'Example Funder Name'],
    ])
  })

  it('appends the sample unit to the total, and nothing when there is none', () => {
    const { container, rerender } = render(<CategoryValueMetadata valueId={1} sampleUnit="adolescents" />)
    expect(renderedRows(container)[2]).toEqual(['Total sample', '13,686 adolescents'])

    rerender(<CategoryValueMetadata valueId={1} />)
    expect(renderedRows(container)[2]).toEqual(['Total sample', '13,686'])
  })

  it('shows a dash for countries when none are covered, and 0 for an empty sample', () => {
    mocks.useGetCategoryValueMetadataQuery.mockReturnValue(
      loaded({ ...metadata, defaults: { totalSample: 0, countries: [] }, entries: [] }),
    )
    const { container } = render(<CategoryValueMetadata valueId={1} />)

    expect(renderedRows(container)).toEqual([
      ['Theme', 'Example Theme'],
      ['Countries', '—'],
      ['Total sample', '0'],
    ])
  })

  it('formats the total the same way whatever the viewer locale', () => {
    // A server render and a browser in another locale must agree, or the page would hydrate
    // with different text than it was sent.
    const spy = vi.spyOn(Number.prototype, 'toLocaleString')
    render(<CategoryValueMetadata valueId={1} />)

    expect(spy).toHaveBeenCalledWith('en-US')
    spy.mockRestore()
  })

  it('takes its title and labels from props', () => {
    const { container } = render(
      <CategoryValueMetadata
        valueId={1}
        title="About this theme"
        themeLabel="Topic"
        countriesLabel="Where"
        sampleLabel="Sample size"
      />,
    )

    expect(screen.getByText('About this theme')).toBeInTheDocument()
    expect(renderedRows(container).slice(0, 3).map(([label]) => label)).toEqual(['Topic', 'Where', 'Sample size'])
  })

  it('prefers the data-* attributes from the embed gateway over props', () => {
    const { container } = render(
      <CategoryValueMetadata
        {...{
          title: 'From props',
          'data-title': 'From the gateway',
          'data-theme-label': 'Pillar',
          'data-countries-label': 'Places',
          'data-sample-label': 'Respondents',
          'data-sample-unit': 'people',
        }}
        valueId={1}
      />,
    )

    expect(screen.getByText('From the gateway')).toBeInTheDocument()
    expect(screen.queryByText('From props')).not.toBeInTheDocument()
    expect(renderedRows(container).slice(0, 3)).toEqual([
      ['Pillar', 'Example Theme'],
      ['Places', 'Country A · Country B'],
      ['Respondents', '13,686 people'],
    ])
  })

  it('queries the API with the repository URL and the value id', () => {
    render(<CategoryValueMetadata valueId={1} />)

    expect(mocks.useGetCategoryValueMetadataQuery).toHaveBeenCalledWith({ baseUrl: API_URL, valueId: 1 })
  })

  it('reads data-value-id from the embed gateway', () => {
    render(<CategoryValueMetadata {...{ 'data-value-id': '7' }} />)

    expect(mocks.useGetCategoryValueMetadataQuery).toHaveBeenCalledWith({ baseUrl: API_URL, valueId: 7 })
  })

  it('passes skipToken, and renders nothing, without a value id', () => {
    mocks.useGetCategoryValueMetadataQuery.mockReturnValue({ data: undefined })
    const { container } = render(<CategoryValueMetadata />)

    expect(mocks.useGetCategoryValueMetadataQuery).toHaveBeenCalledWith(expect.any(Symbol))
    expect(container).toBeEmptyDOMElement()
  })

  it('passes skipToken until the WordPress settings have loaded', () => {
    mocks.settings = null
    mocks.useGetCategoryValueMetadataQuery.mockReturnValue({ data: undefined })
    const { container } = render(<CategoryValueMetadata valueId={1} />)

    expect(mocks.useGetCategoryValueMetadataQuery).toHaveBeenCalledWith(expect.any(Symbol))
    expect(container).toBeEmptyDOMElement()
  })
})
