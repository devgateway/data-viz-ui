import React, { useEffect, useState } from 'react'
import ThemeCard, { type Theme } from './ThemeCard'

export type ThemeListColumns = 2 | 3 | 4

export interface ThemeListProps {
  themes?: Theme[]
  apiUrl?: string
  columns?: ThemeListColumns
  onSelect?: (id: string) => void
  'data-api-url'?: string
  'data-columns'?: string
}

// Tailwind's JIT scanner needs each class name literal in the source, so the
// column count maps to a full, static class string rather than being
// interpolated (`grid-cols-${columns}` would get purged from the build).
const COLUMN_CLASSES: Record<ThemeListColumns, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

const isValidColumns = (value: number): value is ThemeListColumns => value === 2 || value === 3 || value === 4

const ThemeList = (props: ThemeListProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl
  const parsedColumns = Number(props["data-columns"] ?? props.columns)
  const columns = isValidColumns(parsedColumns) ? parsedColumns : 4
  const { themes: providedThemes = [], onSelect } = props

  const [fetchedThemes, setFetchedThemes] = useState<Theme[]>([])

  useEffect(() => {
    if (!apiUrl) {
      return
    }

    let cancelled = false

    fetch(`${apiUrl}/`)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(`Request failed: ${response.status}`))))
      .then((data: Theme[]) => {
        if (!cancelled) {
          setFetchedThemes(data)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFetchedThemes([])
        }
      })

    return () => {
      cancelled = true
    }
  }, [apiUrl])

  const themes = apiUrl ? fetchedThemes : providedThemes

  return (
    <div className={`grid ${COLUMN_CLASSES[columns]} gap-3 auto-rows-fr`}>
      {themes.map((theme) => (
        <ThemeCard key={theme.id} theme={theme} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default ThemeList
