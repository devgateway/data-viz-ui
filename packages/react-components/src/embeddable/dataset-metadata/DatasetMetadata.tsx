import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetDatasetDetailQuery } from '../shared/api'

export type { DatasetMetadataEntry } from '../shared/types'

export interface DatasetMetadataProps {
  apiUrl?: string
  'data-api-url'?: string
  [key: string]: unknown
}

const DatasetMetadata = (props: DatasetMetadataProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl

  const { data: dataset } = useGetDatasetDetailQuery(apiUrl ?? skipToken)
  const entries = dataset?.metadata ?? []

  return (
    <dl className="space-y-2">
      {entries.map((entry, index) => {
        if (!entry.label || entry.value == null) {
          return null
        }

        return (
          <div key={`${entry.label}-${index}`}>
            <dt className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{entry.label}</dt>
            <dd className="text-xs text-foreground leading-relaxed">{entry.value}</dd>
          </div>
        )
      })}
    </dl>
  )
}

export default DatasetMetadata
