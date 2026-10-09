import React, { useMemo } from 'react'
import { Provider } from 'react-redux'
import { createEmbeddableStore } from './store'

interface EmbeddableProviderProps {
  children: React.ReactNode
  /** Share one store (and its request cache) across several roots; defaults to a fresh one. */
  store?: ReturnType<typeof createEmbeddableStore>
}

const EmbeddableProvider = ({ children, store }: EmbeddableProviderProps) => {
  const ownStore = useMemo(() => store ?? createEmbeddableStore(), [store])
  return <Provider store={ownStore}>{children}</Provider>
}

export default EmbeddableProvider
