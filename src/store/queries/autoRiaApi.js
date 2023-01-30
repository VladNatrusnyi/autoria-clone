import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = 'B10K8BR7jl1RdaW7g2LR1bBwvU0AkNYKeWyydnvA'


export const autoRiaApi = createApi({
  reducerPath: 'autoRiaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://developers.ria.com/auto/' }),
  endpoints: (builder) => ({
    getTypesOfTransport: builder.query({
      query: () => ({
        url: `categories/?api_key=${apiKey}`
      }),
    }),

    getMarksOfTransport: builder.query({
      query: (categoryId) => ({
        url: `categories/${categoryId}/marks?api_key=${apiKey}`
      }),
    }),

    getModelsOfTransport: builder.query({
      query: ({categoryId, markId}) => ({
        url: `categories/${categoryId}/marks/${markId}/models/_group?api_key=${apiKey}`
      }),
    }),

    getRegionsOfTransport: builder.query({
      query: () => ({
        url: `states?api_key=${apiKey}`
      }),
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTypesOfTransportQuery,
  useGetMarksOfTransportQuery,
  useGetModelsOfTransportQuery,
  useGetRegionsOfTransportQuery
} = autoRiaApi
