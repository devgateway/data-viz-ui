import { configureStore } from '@reduxjs/toolkit'
import { portalApi } from './api'

export const createEmbeddableStore = () =>
  configureStore({
    reducer: {
      [portalApi.reducerPath]: portalApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(portalApi.middleware),
  })
