import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { joinApiUrl } from '../shared/url'
import { useGetJsonQuery } from '../shared/api'

export interface DatasetMetadataEntry {
  label?: string
  key?: string
  value: string
}

export interface DatasetMetadataProps {
  apiUrl?: string
  'data-api-url'?: string
  [key: string]: unknown
}

const DatasetMetadata = (props: DatasetMetadataProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl

  const { data } = useGetJsonQuery(apiUrl ? joinApiUrl(apiUrl, 'metadata') : skipToken)
  const entries = (data as DatasetMetadataEntry[]) ?? []

  return (
    <dl className="space-y-2">
      {entries.map((entry, index) => {
        const label = entry.label || entry.key
        if (!label || entry.value == null) {
          return null
        }

        return (
          <div key={`${label}-${index}`}>
            <dt className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</dt>
            <dd className="text-xs text-foreground leading-relaxed">{entry.value}</dd>
          </div>
        )
      })}
    </dl>
  )
}

export default DatasetMetadata
