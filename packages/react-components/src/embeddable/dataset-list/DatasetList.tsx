"use client"
import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import DatasetListItem, { type Dataset } from './DatasetListItem'
import { joinApiUrl } from '../shared/url'
import { useGetJsonQuery } from '../shared/api'

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
  const { datasets: providedDatasets = [] } = props;

  const finalUrl = apiUrl ? joinApiUrl(apiUrl, "/datasets/latest") : undefined;
  const { data: fetchedDatasets } = useGetJsonQuery(finalUrl ? finalUrl : skipToken)
  const datasets = apiUrl ? ((fetchedDatasets as Dataset[]) ?? []) : providedDatasets

  return (
    <div>
      <div className="border border-border rounded divide-y divide-border pt-2 mb-6">
        {datasets.map((dataset) => (
          <DatasetListItem key={dataset.id} dataset={dataset} />
        ))}
      </div>
    </div>
  )
}

export default DatasetList
