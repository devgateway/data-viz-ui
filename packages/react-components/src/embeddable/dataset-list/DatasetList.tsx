"use client"
import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import DatasetListItem, { type LatestDatasetItem } from './DatasetListItem'
import { useGetLatestDatasetsQuery, useGetDatasetsByValueIdQuery } from '../shared/api'

export interface DatasetListProps {
  datasets?: LatestDatasetItem[]
  apiUrl?: string
  variant?: 'list' | 'grid'
  categoryValueId?: string | number
  viewAllLabel?: string
  viewAllUrl?: string
  'data-api-url'?: string
  'data-variant'?: string
  'data-category-value-id'?: string
  'data-view-all-label'?: string
  'data-view-all-url'?: string
  [key: string]: unknown
}

const DatasetList = (props: DatasetListProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl
  const variant = ((props['data-variant'] as string) ?? props.variant ?? 'list') as 'list' | 'grid'
  const rawValueId = (props['data-category-value-id'] as string) ?? String(props.categoryValueId ?? '')
  const categoryValueId = rawValueId ? Number(rawValueId) : undefined
  const viewAllLabel = (props['data-view-all-label'] as string) ?? props.viewAllLabel
  const viewAllUrl = (props['data-view-all-url'] as string) ?? props.viewAllUrl
  const { datasets: providedDatasets = [] } = props;

  const byValue = useGetDatasetsByValueIdQuery(
    apiUrl && categoryValueId ? { baseUrl: apiUrl, valueId: categoryValueId } : skipToken
  )
  const latest = useGetLatestDatasetsQuery(
    apiUrl && !categoryValueId ? apiUrl : skipToken
  )

  const datasets = apiUrl
    ? ((categoryValueId ? byValue.data : latest.data) ?? [])
    : providedDatasets

  const viewAllLink = viewAllUrl && viewAllLabel && (
    <div className="text-center mt-4">
      <a href={viewAllUrl} className="text-sm text-primary hover:text-primary/80 transition-colors">
        {viewAllLabel}
      </a>
    </div>
  )

  if (variant === 'grid') {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {datasets.map((dataset) => (
            <DatasetListItem key={dataset.id} dataset={dataset} variant="grid" />
          ))}
        </div>
        {viewAllLink}
      </div>
    )
  }

  return (
    <div>
      <div className="border border-border rounded divide-y divide-border pt-2 mb-6">
        {datasets.map((dataset) => (
          <DatasetListItem key={dataset.id} dataset={dataset} variant="list" />
        ))}
      </div>
      {viewAllLink}
    </div>
  )
}

export default DatasetList
