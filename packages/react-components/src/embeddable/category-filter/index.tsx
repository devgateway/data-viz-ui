"use client"
import React, { useState, useEffect } from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetCategoryValuesQuery } from '../shared/api'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import { FILTER_CHANGE_EVENT, readCheckedFromUrl, writeCheckedToUrl } from '../shared/filterParams'

export interface CategoryFilterProps {
  apiUrl?: string
  categoryId?: string | number
  categoryName?: string
  valueIds?: string
  'data-api-url'?: string
  'data-category-id'?: string
  'data-category-name'?: string
  'data-value-ids'?: string
  [key: string]: unknown
}

function CategoryFilterInner(props: CategoryFilterProps) {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl
  const categoryId = Number((props['data-category-id'] as string) ?? props.categoryId)
  const categoryName = (props['data-category-name'] as string) ?? props.categoryName ?? ''
  const valueIdsRaw = (props['data-value-ids'] as string) ?? props.valueIds ?? ''

  const allowedIds: number[] = valueIdsRaw ? (JSON.parse(valueIdsRaw) as number[]) : []

  const { data: allValues = [] } = useGetCategoryValuesQuery(
    apiUrl && categoryId ? { baseUrl: apiUrl, categoryId } : skipToken
  )

  const values = allowedIds.length > 0
    ? allValues.filter((v) => allowedIds.includes(v.id))
    : allValues

  const [checked, setChecked] = useState<Set<number>>(() => readCheckedFromUrl(categoryId))

  useEffect(() => {
    const sync = () => setChecked(readCheckedFromUrl(categoryId))
    window.addEventListener(FILTER_CHANGE_EVENT, sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener(FILTER_CHANGE_EVENT, sync)
      window.removeEventListener('popstate', sync)
    }
  }, [categoryId])

  const toggle = (id: number) => {
    const next = new Set(checked)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setChecked(next)
    writeCheckedToUrl(categoryId, next)
  }

  if (values.length === 0) return null

  return (
    <div className="mb-5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
        {categoryName}
      </p>
      <div className="space-y-1.5">
        {values.map((v) => (
          <label key={v.id} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={checked.has(v.id)}
              onChange={() => toggle(v.id)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            {v.value}
          </label>
        ))}
      </div>
    </div>
  )
}

const CategoryFilter = (props: CategoryFilterProps) => (
  <EmbeddableProvider>
    <CategoryFilterInner {...props} />
  </EmbeddableProvider>
)

export default CategoryFilter
