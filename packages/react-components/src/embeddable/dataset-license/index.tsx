import React from 'react'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import DatasetLicenseComponent from './DatasetLicense'
import type { DatasetLicenseProps } from './DatasetLicense'

const DatasetLicense = (props: DatasetLicenseProps) => (
  <EmbeddableProvider>
    <DatasetLicenseComponent {...props} />
  </EmbeddableProvider>
)

export default DatasetLicense
export type { DatasetLicenseProps } from './DatasetLicense'
