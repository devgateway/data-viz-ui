import React from 'react'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import DatasetCitationComponent from './DatasetCitation'
import type { DatasetCitationProps } from './DatasetCitation'

const DatasetCitation = (props: DatasetCitationProps) => (
  <EmbeddableProvider>
    <DatasetCitationComponent {...props} />
  </EmbeddableProvider>
)

export default DatasetCitation
export type { DatasetCitationProps } from './DatasetCitation'
