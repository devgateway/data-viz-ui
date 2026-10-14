// @vitest-environment jsdom
import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const mocks = vi.hoisted(() => ({
  useGetCategoryValueSummaryQuery: vi.fn(),
  useWpSettings: vi.fn(),
}))

vi.mock('../shared/api', () => ({
  useGetCategoryValueSummaryQuery: mocks.useGetCategoryValueSummaryQuery,
}))

vi.mock('@devgateway/wp-react-lib/v2', () => ({
  useWpSettings: mocks.useWpSettings,
}))

import CategoryValueSummary from './CategoryValueSummary'

const API_URL = 'https://example.com/api'

beforeEach(() => {
  mocks.useWpSettings.mockReturnValue({ data: { dataset_repository_url: API_URL } })
})

afterEach(() => vi.clearAllMocks())

describe('CategoryValueSummary', () => {
  it('renders nothing while data is loading', () => {
    mocks.useGetCategoryValueSummaryQuery.mockReturnValue({ data: undefined })
    const { container } = render(<CategoryValueSummary valueId={1} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('shows countries and datasets counts', () => {
    mocks.useGetCategoryValueSummaryQuery.mockReturnValue({ data: { countries: 3, datasets: 4 } })
    render(<CategoryValueSummary valueId={1} />)
    expect(screen.getByText('Countries')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Datasets')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('reads data-value-id from the embed gateway', () => {
    mocks.useGetCategoryValueSummaryQuery.mockReturnValue({ data: { countries: 2, datasets: 5 } })
    render(<CategoryValueSummary {...{ 'data-value-id': '7' }} />)
    expect(mocks.useGetCategoryValueSummaryQuery).toHaveBeenCalledWith(
      expect.objectContaining({ valueId: 7 })
    )
  })

  it('passes skipToken when valueId is absent', () => {
    mocks.useGetCategoryValueSummaryQuery.mockReturnValue({ data: undefined })
    const { container } = render(<CategoryValueSummary />)
    expect(mocks.useGetCategoryValueSummaryQuery).toHaveBeenCalledWith(expect.any(Symbol))
    expect(container).toBeEmptyDOMElement()
  })

  it('passes skipToken when settings are not yet loaded', () => {
    mocks.useWpSettings.mockReturnValue({ data: undefined })
    mocks.useGetCategoryValueSummaryQuery.mockReturnValue({ data: undefined })
    const { container } = render(<CategoryValueSummary valueId={1} />)
    expect(mocks.useGetCategoryValueSummaryQuery).toHaveBeenCalledWith(expect.any(Symbol))
    expect(container).toBeEmptyDOMElement()
  })
})
