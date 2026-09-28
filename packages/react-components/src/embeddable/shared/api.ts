import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { joinApiUrl } from './url'
import type { DatasetDetail, DatasetResource, FileVariable, LatestDatasetItem, Theme } from './types'

export const portalApi = createApi({
  reducerPath: 'portalApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['DatasetDetail', 'DatasetResources', 'FileVariables', 'LatestDatasets', 'Themes'],
  endpoints: (builder) => ({
    // GET /datasets/latest
    getLatestDatasets: builder.query<LatestDatasetItem[], string>({
      query: (baseUrl) => joinApiUrl(baseUrl, '/datasets/latest'),
      providesTags: (_result, _error, baseUrl) => [{ type: 'LatestDatasets', id: baseUrl }],
    }),
    // GET /themes
    getThemes: builder.query<Theme[], string>({
      query: (baseUrl) => joinApiUrl(baseUrl, '/themes'),
      providesTags: (_result, _error, baseUrl) => [{ type: 'Themes', id: baseUrl }],
    }),
    // GET /datasets/{id} — full detail: doi, license, citation, files, metadata
    getDatasetDetail: builder.query<DatasetDetail, string>({
      query: (url) => url,
      providesTags: (_result, _error, url) => [{ type: 'DatasetDetail', id: url }],
    }),
    // GET /datasets/{id}/resources
    getDatasetResources: builder.query<DatasetResource[], string>({
      query: (url) => joinApiUrl(url, 'resources'),
      providesTags: (_result, _error, url) => [{ type: 'DatasetResources', id: url }],
    }),
    // GET /files/{id}/variables
    getFileVariables: builder.query<FileVariable[], string>({
      query: (url) => joinApiUrl(url, 'variables'),
      providesTags: (_result, _error, url) => [{ type: 'FileVariables', id: url }],
    }),
  }),
})

export const {
  useGetLatestDatasetsQuery,
  useGetThemesQuery,
  useGetDatasetDetailQuery,
  useGetDatasetResourcesQuery,
  useGetFileVariablesQuery,
} = portalApi
