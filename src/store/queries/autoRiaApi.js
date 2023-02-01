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

    getCarsId: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const randomResult = await fetchWithBQ(`search?api_key=${apiKey}&${_arg}`)
        if (randomResult.error) return { error: randomResult.error }
        console.log('randomResult.data',randomResult.data)
        return randomResult.data ?
          { data: {
              ids: randomResult.data.result.search_result.ids,
              count: randomResult.data.result.search_result.count
            }
          }
        : { error: randomResult.error }
      },
    }),

    getCars: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // console.log('_arg', _arg)
        let arr = []
        for (let car of _arg) {
          const result = await fetchWithBQ(`info?api_key=${apiKey}&auto_id=${car}`)
          if (result.data) {
            arr.push(result.data)
          }
        }
        console.log('RES', arr)
        return arr ? { data: arr } : { error: 'Error' }
      },
    }),



  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTypesOfTransportQuery,
  useGetMarksOfTransportQuery,
  useGetModelsOfTransportQuery,
  useGetRegionsOfTransportQuery,
  useGetCarsIdQuery,
  useGetCarsQuery
} = autoRiaApi
