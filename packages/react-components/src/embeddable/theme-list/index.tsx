import React from 'react'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import ThemeListComponent from './ThemeList'
import type { ThemeListProps } from './ThemeList'

const ThemeList = (props: ThemeListProps) => (
  <EmbeddableProvider>
    <ThemeListComponent {...props} />
  </EmbeddableProvider>
)

export default ThemeList
export type { ThemeListProps, ThemeListColumns } from './ThemeList'
export type { Theme, ThemeCardProps } from './ThemeCard'
