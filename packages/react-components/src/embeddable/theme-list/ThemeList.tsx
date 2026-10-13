import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import ThemeCard, { type Theme } from './ThemeCard'
import { useGetCategoryValuesQuery, useGetThemesQuery } from '../shared/api'
import type { CategoryValue } from '../shared/types'
import { useWpSettings } from '../shared/useWpSettings'

export type ThemeListColumns = 1 | 2 | 3 | 4

export interface ThemeListProps {
  themes?: Theme[]
  apiUrl?: string
  columns?: ThemeListColumns
  categoryId?: string | number
  showAll?: string | boolean
  valueIds?: string
  onSelect?: (id: number) => void
  'data-api-url'?: string
  'data-columns'?: string
  'data-category-id'?: string
  'data-show-all'?: string
  'data-value-ids'?: string
}

// Tailwind's JIT scanner needs each class name literal in the source, so the
// column count maps to a full, static class string rather than being
// interpolated (`grid-cols-${columns}` would get purged from the build).
const COLUMN_CLASSES: Record<ThemeListColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

const isValidColumns = (value: number): value is ThemeListColumns => value === 1 || value === 2 || value === 3 || value === 4

// A category value carries no dataset roll-up. Where it is also one of the portal's themes
// (matched by id) the counts and status come from there; otherwise the card shows no datasets.
const toTheme = ({ id, value, description, wordpressUrl, sortOrder }: CategoryValue, portalTheme?: Theme): Theme => ({
  id,
  value,
  description: description ?? undefined,
  wordpressUrl: wordpressUrl ?? undefined,
  sortOrder,
  status: portalTheme?.status ?? 'Active',
  datasetCount: portalTheme?.datasetCount ?? 0,
  countries: portalTheme?.countries ?? [],
})

const isEmpty = (t: Theme) => t.status !== 'Active' || (t.datasetCount === 0 && t.countries.length === 0)

// Array.prototype.sort is stable, so each group keeps the API's own order.
const emptyLast = (themes: Theme[]): Theme[] => [...themes].sort((a, b) => Number(isEmpty(a)) - Number(isEmpty(b)))

const ThemeList = (props: ThemeListProps) => {
  const { settings } = useWpSettings()
  const apiUrl = ((props['data-api-url'] as string) ?? props.apiUrl) || settings?.dataset_repository_url
  const parsedColumns = Number(props['data-columns'] ?? props.columns)
  const columns = isValidColumns(parsedColumns) ? parsedColumns : 4
  const categoryId = Number((props['data-category-id'] as string) ?? props.categoryId) || 0
  const showAll = ((props['data-show-all'] as string) ?? String(props.showAll ?? 'true')) !== 'false'
  const valueIdsRaw = (props['data-value-ids'] as string) ?? props.valueIds ?? ''
  const allowedIds: number[] = valueIdsRaw ? (JSON.parse(valueIdsRaw) as number[]) : []
  const { themes: providedThemes = [], onSelect } = props

  // Without a category the list is the portal's own themes; with one it lists that
  // category's values instead, still decorated with the themes' counts.
  const { data: fetchedThemes } = useGetThemesQuery(apiUrl ?? skipToken)
  const { data: categoryValues = [] } = useGetCategoryValuesQuery(apiUrl && categoryId ? { baseUrl: apiUrl, categoryId } : skipToken)

  const unsorted: Theme[] = categoryId
    ? categoryValues
        .filter((v) => showAll || allowedIds.length === 0 || allowedIds.includes(v.id))
        .map((v) => toTheme(v, fetchedThemes?.find((t) => t.id === v.id)))
    : apiUrl ? (fetchedThemes ?? []) : providedThemes

  const themes = emptyLast(unsorted)

  return (
    <div className={`grid ${COLUMN_CLASSES[columns]} gap-3 auto-rows-fr`}>
      {themes.map((theme) => (
        <ThemeCard key={theme.id} theme={theme} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default ThemeList
