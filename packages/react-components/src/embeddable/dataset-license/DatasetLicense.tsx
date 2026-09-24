import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { joinApiUrl } from '../shared/url'
import { useGetJsonQuery } from '../shared/api'
import type { DatasetDetail } from '../shared/types'

export interface DatasetLicenseProps {
  apiUrl?: string
  'data-api-url'?: string
  [key: string]: unknown
}

const DatasetLicense = (props: DatasetLicenseProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl

  const { data } = useGetJsonQuery(apiUrl ? joinApiUrl(apiUrl) : skipToken)
  const dataset = (data as DatasetDetail) ?? {}

  if (!dataset.licenseName) {
    return null
  }

  return (
    <div>
      <span className="text-[10px] font-mono bg-white border border-border text-muted-foreground px-1.5 py-0.5 rounded">
        {dataset.licenseName}
      </span>
      {dataset.licenseText && <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">{dataset.licenseText}</p>}
    </div>
  )
}

export default DatasetLicense
