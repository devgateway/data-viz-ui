import { configureStore } from '@reduxjs/toolkit'
import { embeddableApi } from './api'

export const createEmbeddableStore = () =>
  configureStore({
    reducer: {
      [embeddableApi.reducerPath]: embeddableApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(embeddableApi.middleware),
  })
