import React from 'react'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import DatasetFilesComponent from './DatasetFiles'
import type { DatasetFilesProps } from './DatasetFiles'

const DatasetFiles = (props: DatasetFilesProps) => (
  <EmbeddableProvider>
    <DatasetFilesComponent {...props} />
  </EmbeddableProvider>
)

export default DatasetFiles
export type { DatasetFilesProps, DatasetFile } from './DatasetFiles'
