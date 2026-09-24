import React from 'react'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import DatasetListComponent from './DatasetList'
import type { DatasetListProps } from './DatasetList'

const DatasetList = (props: DatasetListProps) => (
  <EmbeddableProvider>
    <DatasetListComponent {...props} />
  </EmbeddableProvider>
)

export default DatasetList
export type { DatasetListProps } from './DatasetList'
export type { Dataset, DatasetListItemProps } from './DatasetListItem'
