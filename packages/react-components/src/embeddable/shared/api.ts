import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const embeddableApi = createApi({
  reducerPath: 'embeddableApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getJson: builder.query<unknown, string>({
      query: (url) => {
        console.log("fetching URL:", url)
        return url;
      }
    }),
  }),
})

export const { useGetJsonQuery } = embeddableApi
