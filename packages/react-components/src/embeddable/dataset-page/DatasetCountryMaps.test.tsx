// @vitest-environment jsdom
import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DatasetCountryMaps } from './DatasetPage'

describe('DatasetCountryMaps', () => {
  it('renders a map for each country that has one', () => {
    render(
      <DatasetCountryMaps
        categoryValues={[
          { id: 1, categoryId: 8, value: 'South Africa' },
          { id: 2, categoryId: 8, value: 'Kenya' },
        ]}
      />,
    )

    expect(screen.getByRole('img', { name: 'South Africa' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Kenya' })).toBeInTheDocument()
  })

  it('ignores category values that are not countries with a map', () => {
    const { container } = render(
      <DatasetCountryMaps categoryValues={[{ id: 3, categoryId: 1, value: 'Illicit Trade' }]} />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when the dataset has no category values', () => {
    const { container } = render(<DatasetCountryMaps />)

    expect(container).toBeEmptyDOMElement()
  })
})
