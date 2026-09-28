import React from 'react'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import VariableBrowserComponent from './VariableBrowser'
import type { VariableBrowserProps } from './VariableBrowser'

const VariableBrowser = (props: VariableBrowserProps) => (
  <EmbeddableProvider>
    <VariableBrowserComponent {...props} />
  </EmbeddableProvider>
)

export default VariableBrowser
export type { VariableBrowserProps } from './VariableBrowser'
