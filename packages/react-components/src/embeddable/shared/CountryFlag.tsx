import React from 'react'
import { getAlpha2ByName } from 'country-locale-map'

// A flag emoji is two "regional indicator" symbols, one per letter of the ISO code (KE → 🇰🇪).
// This offset is the gap between 'A' (U+0041) and the regional indicator 🇦 (U+1F1E6).
const REGIONAL_INDICATOR_OFFSET = 0x1f1a5

const COUNTRY_NAME_ALIASES: Record<string, string> = {
  drc: 'CD',
  'dr congo': 'CD',
  'ivory coast': 'CI',
}

export function getCountryCode(name: string): string | undefined {
  const trimmed = name.trim()
  return COUNTRY_NAME_ALIASES[trimmed.toLowerCase()] ?? getAlpha2ByName(trimmed)
}

export function getFlagEmoji(countryCode: string): string {
  return Array.from(countryCode.toUpperCase(), (char) =>
    String.fromCodePoint(char.charCodeAt(0) + REGIONAL_INDICATOR_OFFSET),
  ).join('')
}

export interface CountryFlagProps {
  country: string
  className?: string
}

const CountryFlag = ({ country, className }: CountryFlagProps) => {
  const countryCode = getCountryCode(country)
  if (!countryCode) return null
  return (
    <span role="img" aria-label={country} title={country} className={className} style={{ fontSize: '1rem', lineHeight: 1 }}>
      {getFlagEmoji(countryCode)}
    </span>
  )
}

export default CountryFlag
