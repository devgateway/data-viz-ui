"use client"
import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import DatasetListItem, { type LatestDatasetItem } from './DatasetListItem'
import { useGetLatestDatasetsQuery } from '../shared/api'

export interface DatasetListProps {
  datasets?: LatestDatasetItem[]
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
  const { datasets: providedDatasets = [] } = props;

  const { data: fetchedDatasets } = useGetLatestDatasetsQuery(apiUrl ?? skipToken)
  const datasets = apiUrl ? (fetchedDatasets ?? []) : providedDatasets

  return (
    <div>
      <div className="border border-border rounded divide-y divide-border pt-2 mb-6">
        {datasets.map((dataset) => (
          <DatasetListItem key={dataset.id} dataset={dataset} />
        ))}
      </div>
      {viewAllLabel && (
        viewAllUrl ? (
          <a href={viewAllUrl} className="block text-center text-sm font-medium py-3 text-primary hover:text-primary-dark">
            {viewAllLabel}
          </a>
        ) : (
          <span className="block text-center text-sm font-medium py-3 text-muted-foreground">
            {viewAllLabel}
          </span>
        )
      )}
    </div>
  )
}

export default DatasetList
