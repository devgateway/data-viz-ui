"use client"
import React, { useState, useEffect, useRef } from 'react'

export const SEARCH_CHANGE_EVENT = 'searchchange'

function readQuery(): string {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get('q') ?? ''
}

function replaceQuery(q: string): void {
  const params = new URLSearchParams(window.location.search)
  if (q) params.set('q', q)
  else params.delete('q')
  const qs = params.toString()
  window.history.replaceState({}, '', `${window.location.pathname}${qs ? '?' + qs : ''}`)
  window.dispatchEvent(new CustomEvent(SEARCH_CHANGE_EVENT))
}

function pushQuery(q: string): void {
  const params = new URLSearchParams(window.location.search)
  if (q) params.set('q', q)
  else params.delete('q')
  const qs = params.toString()
  window.history.pushState({}, '', `${window.location.pathname}${qs ? '?' + qs : ''}`)
  window.dispatchEvent(new CustomEvent(SEARCH_CHANGE_EVENT))
}

export interface SearchBoxProps {
  placeholder?: string
  'data-placeholder'?: string
  [key: string]: unknown
}

function SearchBox(props: SearchBoxProps) {
  const placeholder =
    (props['data-placeholder'] as string) ??
    props.placeholder ??
    'Search datasets, questionnaires, reports, publications'

  const [query, setQuery] = useState(readQuery)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const sync = () => setQuery(readQuery())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => replaceQuery(value), 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      pushQuery(query)
    }
  }

  return (
    <div className="relative mb-6">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
      >
        <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
        <line x1="9.8" y1="9.8" x2="13" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        autoFocus
      />
    </div>
  )
}

export default SearchBox
