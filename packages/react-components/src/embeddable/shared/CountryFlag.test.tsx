// @vitest-environment jsdom
import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import CountryFlag, { getCountryCode } from './CountryFlag'

describe('getCountryCode', () => {
  it('resolves full country names', () => {
    expect(getCountryCode('Kenya')).toBe('KE')
    expect(getCountryCode('Nigeria')).toBe('NG')
    expect(getCountryCode('Democratic Republic of the Congo')).toBe('CD')
  })

  it('resolves known aliases case-insensitively', () => {
    expect(getCountryCode('DRC')).toBe('CD')
    expect(getCountryCode(' drc ')).toBe('CD')
  })

  it('returns undefined for unknown names', () => {
    expect(getCountryCode('Atlantis')).toBeUndefined()
  })
})

describe('CountryFlag', () => {
  it('renders the flag emoji with the country name as its label', () => {
    render(<CountryFlag country="Kenya" />)

    expect(screen.getByRole('img', { name: 'Kenya' })).toHaveTextContent('🇰🇪')
  })

  it('renders nothing for an unknown country', () => {
    const { container } = render(<CountryFlag country="Atlantis" />)

    expect(container).toBeEmptyDOMElement()
  })
})
