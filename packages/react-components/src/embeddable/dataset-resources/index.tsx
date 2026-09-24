import React from 'react'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import DatasetResourcesComponent from './DatasetResources'
import type { DatasetResourcesProps } from './DatasetResources'

const DatasetResources = (props: DatasetResourcesProps) => (
  <EmbeddableProvider>
    <DatasetResourcesComponent {...props} />
  </EmbeddableProvider>
)

export default DatasetResources
export type { DatasetResourcesProps, DatasetResource } from './DatasetResources'
