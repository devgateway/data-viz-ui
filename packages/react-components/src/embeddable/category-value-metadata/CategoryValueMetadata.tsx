"use client"
import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useWpSettings } from '../shared/useWpSettings'
import { useGetCategoryValueMetadataQuery } from '../shared/api'

export interface CategoryValueMetadataProps {
  valueId?: number | string
  title?: string
  themeLabel?: string
  countriesLabel?: string
  sampleLabel?: string
  sampleUnit?: string
  'data-value-id'?: string
  'data-title'?: string
  'data-theme-label'?: string
  'data-countries-label'?: string
  'data-sample-label'?: string
  'data-sample-unit'?: string
  [key: string]: unknown
}

const CategoryValueMetadata = (props: CategoryValueMetadataProps) => {
  const valueId = Number((props['data-value-id'] as string) ?? props.valueId) || undefined
  const title = (props['data-title'] as string) ?? props.title ?? 'Study summary'
  const themeLabel = (props['data-theme-label'] as string) ?? props.themeLabel ?? 'Theme'
  const countriesLabel = (props['data-countries-label'] as string) ?? props.countriesLabel ?? 'Countries'
  const sampleLabel = (props['data-sample-label'] as string) ?? props.sampleLabel ?? 'Total sample'
  const sampleUnit = (props['data-sample-unit'] as string) ?? props.sampleUnit ?? ''
  const { settings } = useWpSettings()
  const apiUrl = settings?.dataset_repository_url

  const { data } = useGetCategoryValueMetadataQuery(
    apiUrl && valueId ? { baseUrl: apiUrl, valueId } : skipToken
  )

  if (!data) return null

  const { countries, totalSample } = data.defaults

  // The API sends the raw figure; the unit ("adolescents") is portal text, so it comes from the
  // block. A fixed locale keeps a server render and a browser in another locale in agreement.
  const sample = totalSample.toLocaleString('en-US') + (sampleUnit ? ` ${sampleUnit}` : '')

  // The two calculated rows lead, then the stored entries in the order the API returns them.
  const rows = [
    { label: themeLabel, value: data.value },
    { label: countriesLabel, value: countries.length > 0 ? countries.map((country) => country.value).join(' · ') : '—' },
    { label: sampleLabel, value: sample },
    ...data.entries.map((entry) => ({ label: entry.key, value: entry.value })),
  ]

  return (
    <div>
      <div className="border border-border rounded p-4 text-sm">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{title}</p>
        <dl className="space-y-2.5">
          {rows.map(({ label, value }, index) => (
            <div key={`${index}-${label}`} className="grid grid-cols-[100px_1fr] gap-2">
              <dt className="text-xs text-muted-foreground leading-relaxed">{label}</dt>
              <dd className="text-xs text-foreground leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default CategoryValueMetadata
