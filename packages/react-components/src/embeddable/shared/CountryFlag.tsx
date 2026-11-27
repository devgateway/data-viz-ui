import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { getAlpha2ByName } from 'country-locale-map'

const COUNTRY_NAME_ALIASES: Record<string, string> = {
  drc: 'CD',
  'dr congo': 'CD',
  'ivory coast': 'CI',
}

export function getCountryCode(name: string): string | undefined {
  const trimmed = name.trim()
  return COUNTRY_NAME_ALIASES[trimmed.toLowerCase()] ?? getAlpha2ByName(trimmed)
}

export interface CountryFlagProps {
  country: string
  className?: string
}

const CountryFlag = ({ country, className }: CountryFlagProps) => {
  const countryCode = getCountryCode(country)
  if (!countryCode) return null
  return (
    <ReactCountryFlag
      svg
      countryCode={countryCode}
      alt={country}
      title={country}
      className={className}
      style={{ width: '1.25em', height: '1em', objectFit: 'cover' }}
    />
  )
}

export default CountryFlag
