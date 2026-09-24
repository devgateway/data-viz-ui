import React from 'react'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import DatasetDoiComponent from './DatasetDoi'
import type { DatasetDoiProps } from './DatasetDoi'

const DatasetDoi = (props: DatasetDoiProps) => (
  <EmbeddableProvider>
    <DatasetDoiComponent {...props} />
  </EmbeddableProvider>
)

export default DatasetDoi
export type { DatasetDoiProps } from './DatasetDoi'
