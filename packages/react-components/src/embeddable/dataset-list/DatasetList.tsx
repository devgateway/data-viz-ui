import React from 'react'
import DatasetListItem, { type Dataset } from './DatasetListItem'
import { joinApiUrl } from '../shared/url'
import { useJsonFetch } from '../shared/useJsonFetch'

export interface DatasetListProps {
  datasets?: Dataset[]
  apiUrl?: string
  viewAllLabel?: string
  viewAllUrl?: string
  'data-api-url'?: string
  'data-view-all-label'?: string
  'data-view-all-url'?: string
  [key: string]: unknown
}

const DatasetList = (props: DatasetListProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl
  const viewAllLabel = (props['data-view-all-label'] as string) ?? props.viewAllLabel
  const viewAllUrl = (props['data-view-all-url'] as string) ?? props.viewAllUrl
  const { datasets: providedDatasets = [] } = props

  const fetchedDatasets = useJsonFetch<Dataset[]>(apiUrl ? joinApiUrl(apiUrl) : undefined, [])
  const datasets = apiUrl ? fetchedDatasets : providedDatasets

  return (
    <div>
      {viewAllLabel && (
        <div className="flex justify-end mb-5">
          {viewAllUrl ? (
            <a href={viewAllUrl} className="text-xs text-primary hover:text-primary-dark underline underline-offset-2">
              {viewAllLabel}
            </a>
          ) : (
            <span className="text-xs text-primary underline underline-offset-2">{viewAllLabel}</span>
          )}
        </div>
      )}

      <div className="border border-border rounded divide-y divide-border">
        {datasets.map((dataset) => (
          <DatasetListItem key={dataset.id} dataset={dataset} />
        ))}
      </div>
    </div>
  )
}

export default DatasetList
