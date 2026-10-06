import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { joinApiUrl } from './url'
import type { Category, CategoryValue, DatasetDetail, DatasetResource, DatasetSearchResponse, FileVariable, LatestDatasetItem, Theme } from './types'

export const portalApi = createApi({
  reducerPath: 'portalApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['DatasetDetail', 'DatasetResources', 'FileVariables', 'LatestDatasets', 'Themes', 'Categories', 'CategoryValues', 'DatasetSearch'],
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
    // GET /categories
    getCategories: builder.query<Category[], string>({
      query: (baseUrl) => joinApiUrl(baseUrl, '/categories'),
      providesTags: (_result, _error, baseUrl) => [{ type: 'Categories', id: baseUrl }],
    }),
    // GET /categories/{id}/values
    getCategoryValues: builder.query<CategoryValue[], { baseUrl: string; categoryId: number }>({
      query: ({ baseUrl, categoryId }) => joinApiUrl(baseUrl, `/categories/${categoryId}/values`),
      providesTags: (_result, _error, { baseUrl, categoryId }) => [{ type: 'CategoryValues', id: `${baseUrl}/${categoryId}` }],
    }),
    // GET /datasets/search
    searchDatasets: builder.query<DatasetSearchResponse, { baseUrl: string; params: string }>({
      query: ({ baseUrl, params }) => {
        const url = joinApiUrl(baseUrl, '/datasets/search')
        return params ? `${url}?${params}` : url
      },
      providesTags: (_result, _error, { baseUrl, params }) => [{ type: 'DatasetSearch', id: `${baseUrl}?${params}` }],
    }),
  }),
})

export const {
  useGetLatestDatasetsQuery,
  useGetThemesQuery,
  useGetDatasetDetailQuery,
  useGetDatasetResourcesQuery,
  useGetFileVariablesQuery,
  useGetCategoriesQuery,
  useGetCategoryValuesQuery,
  useSearchDatasetsQuery,
} = portalApi
