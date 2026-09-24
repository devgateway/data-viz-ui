import React from 'react'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import DatasetMetadataComponent from './DatasetMetadata'
import type { DatasetMetadataProps } from './DatasetMetadata'

const DatasetMetadata = (props: DatasetMetadataProps) => (
  <EmbeddableProvider>
    <DatasetMetadataComponent {...props} />
  </EmbeddableProvider>
)

export default DatasetMetadata
export type { DatasetMetadataProps, DatasetMetadataEntry } from './DatasetMetadata'
