import React from 'react'
import { render, renderHook } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createEmbeddableStore } from './store'

const makeWrapper = () => {
  const store = createEmbeddableStore()
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )
  return { store, Wrapper }
}

export const renderWithProvider = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const { Wrapper } = makeWrapper()
  return render(ui, { wrapper: Wrapper, ...options })
}

export const renderHookWithProvider = <T,>(hook: () => T) => {
  const { Wrapper } = makeWrapper()
  return renderHook(hook, { wrapper: Wrapper })
}
