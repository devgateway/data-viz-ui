import React from 'react'
import { joinApiUrl } from '../shared/url'
import { useJsonFetch } from '../shared/useJsonFetch'
import CopyButton from '../shared/CopyButton'
import type { DatasetDetail } from '../shared/types'

export interface DatasetDoiProps {
  apiUrl?: string
  'data-api-url'?: string
  [key: string]: unknown
}

const DatasetDoi = (props: DatasetDoiProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl

  const dataset = useJsonFetch<DatasetDetail>(apiUrl ? joinApiUrl(apiUrl) : undefined, {})

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
