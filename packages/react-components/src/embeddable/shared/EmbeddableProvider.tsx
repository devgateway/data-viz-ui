import React, { useMemo } from 'react'
import { Provider } from 'react-redux'
import { createEmbeddableStore } from './store'

const EmbeddableProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useMemo(() => createEmbeddableStore(), [])
  return <Provider store={store}>{children}</Provider>
}

export default EmbeddableProvider
