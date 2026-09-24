import React from 'react'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import DatasetPageComponent from './DatasetPage'
import type { DatasetPageProps } from './DatasetPage'

const DatasetPage = (props: DatasetPageProps) => (
  <EmbeddableProvider>
    <DatasetPageComponent {...props} />
  </EmbeddableProvider>
)

export default DatasetPage
export type { DatasetPageProps } from './DatasetPage'
