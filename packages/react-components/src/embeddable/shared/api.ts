import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const embeddableApi = createApi({
  reducerPath: 'embeddableApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getJson: builder.query<unknown, string>({
      query: (url) => url,
    }),
  }),
})

export const { useGetJsonQuery } = embeddableApi
