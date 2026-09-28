import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetDatasetDetailQuery } from '../shared/api'

export interface DatasetLicenseProps {
  apiUrl?: string
  'data-api-url'?: string
  [key: string]: unknown
}

const DatasetLicense = (props: DatasetLicenseProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl

  const { data: dataset } = useGetDatasetDetailQuery(apiUrl ?? skipToken)

  if (!dataset?.licenseName) {
    return null
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono bg-white border border-border text-muted-foreground px-1.5 py-0.5 rounded">
          {dataset.licenseName}
        </span>
      </div>
      {dataset.licenseText && <p className="text-xs text-muted-foreground leading-relaxed">{dataset.licenseText}</p>}
    </div>
  )
}

export default DatasetLicense
