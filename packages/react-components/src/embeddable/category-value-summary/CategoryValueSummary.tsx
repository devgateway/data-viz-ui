"use client"
import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useWpSettings } from '../shared/useWpSettings'
import { useGetCategoryValueSummaryQuery } from '../shared/api'

export interface CategoryValueSummaryProps {
  valueId?: number | string
  countriesLabel?: string
  datasetsLabel?: string
  'data-value-id'?: string
  'data-countries-label'?: string
  'data-datasets-label'?: string
  [key: string]: unknown
}

const CategoryValueSummary = (props: CategoryValueSummaryProps) => {
  const valueId = Number((props['data-value-id'] as string) ?? props.valueId) || undefined
  const countriesLabel = (props['data-countries-label'] as string) ?? props.countriesLabel ?? 'Countries'
  const datasetsLabel = (props['data-datasets-label'] as string) ?? props.datasetsLabel ?? 'Datasets'
  const {  settings } = useWpSettings()
  const apiUrl = settings?.dataset_repository_url

  const { data } = useGetCategoryValueSummaryQuery(
    apiUrl && valueId ? { baseUrl: apiUrl, valueId } : skipToken
  )

  if (!data) return null

  const { countries, datasets } = data

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="text-right">
        <p className="text-xs text-muted-foreground">{countriesLabel}</p>
        <p className="font-semibold text-foreground">{countries}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">{datasetsLabel}</p>
        <p className="font-semibold text-foreground">{datasets}</p>
      </div>
    </div>
  )
}

export default CategoryValueSummary
