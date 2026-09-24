import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { joinApiUrl } from '../shared/url'
import { useGetJsonQuery } from '../shared/api'
import CopyButton from '../shared/CopyButton'
import type { DatasetDetail } from '../shared/types'

export interface DatasetDoiProps {
  apiUrl?: string
  'data-api-url'?: string
  [key: string]: unknown
}

const DatasetDoi = (props: DatasetDoiProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl

  const { data } = useGetJsonQuery(apiUrl ? joinApiUrl(apiUrl) : skipToken)
  const dataset = (data as DatasetDetail) ?? {}

  if (!dataset.doi) {
    return null
  }

  const doiUrl = `https://doi.org/${dataset.doi}`

  return (
    <div className="flex items-center justify-between gap-2">
      <a href={doiUrl} className="text-xs font-mono text-foreground break-all">
        {dataset.doi}
      </a>
      <CopyButton
        text={doiUrl}
        className="shrink-0 text-xs text-primary hover:text-primary-dark font-medium focus-visible:outline-2 focus-visible:outline-primary rounded"
      />
    </div>
  )
}

export default DatasetDoi
