import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = 'B10K8BR7jl1RdaW7g2LR1bBwvU0AkNYKeWyydnvA'


export const autoRiaApi = createApi({
  reducerPath: 'autoRiaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://developers.ria.com/auto/' }),
  endpoints: (builder) => ({
    getTypesOfTransport: builder.query({
      query: () => ({
        url: `categories?api_key=${apiKey}`
      }),
    }),

    getMarksOfTransport: builder.query({
      query: (categoryId) => ({
        url: `categories/${categoryId}/marks?api_key=${apiKey}`
      }),
    }),

    getBodyTypes: builder.query({
      query: (categoryId) => ({
        url: `categories/${categoryId}/bodystyles?api_key=${apiKey}`
      }),
    }),

    getModelsOfTransport: builder.query({
      query: ({categoryId, markId}) => ({
        url: `categories/${categoryId}/marks/${markId}/models/_group?api_key=${apiKey}`
      }),
    }),

    getGearboxesOfTransport: builder.query({
      query: (categoryId) => ({
        url: `categories/${categoryId}/gearboxes?api_key=${apiKey}`
      }),
    }),

    getDriverTypesOfTransport: builder.query({
      query: (categoryId) => ({
        url: `categories/${categoryId}/driverTypes?api_key=${apiKey}`
      }),
    }),

    getFuelOfTransport: builder.query({
      query: () => ({
        url: `type?api_key=${apiKey}`
      }),
    }),

    getRegionsOfTransport: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const statesData = await fetchWithBQ(`states?api_key=${apiKey}`)
        if (statesData.error) return { error: statesData.error }
        const states = statesData.data

        let arr = []
        for (let state of states) {
          const cities = await fetchWithBQ(`states/${state.value}/cities?api_key=${apiKey}`)
          if (cities.data) {
            const res = {
              label: state.name,
              value: state.value,
              children: cities.data.map(city => ({label: city.name, value: city.value }))
            }
            arr.push(res)
          }
        }
        return arr ? { data: arr } : { error: 'Error' }
      },
    }),

    getCitiesOfTransport: builder.query({
      query: () => ({
        url: `states?api_key=${apiKey}`
      }),
    }),

    getCarsId: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const randomResult = await fetchWithBQ({
          url: `search?api_key=${apiKey}&${_arg}`
        })
        if (randomResult.error) return { error: randomResult.error }
        console.log('randomResult.data',randomResult.data)

        console.log('ALL data', randomResult.data)
        return randomResult.data ?
          { data: {
              ids: randomResult.data.result.search_result.ids,
              count: randomResult.data.result.search_result.count,
              commonCars: {
                ids: randomResult.data.result.search_result_common.data.map(item => item.id),
                count: randomResult.data.result.search_result_common.count
              }

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

    getCurrentCar: builder.query({
      query: (carId) => ({
        url: `info?api_key=${apiKey}&auto_id=${carId}`
      }),
    }),

    getCarImages: builder.query({
      query: (carId) => ({
        url: `fotos/${carId}?api_key=${apiKey}`
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
  useGetRegionsOfTransportQuery,
  useGetCarsIdQuery,
  useGetCarsQuery,
  useGetBodyTypesQuery,
  useGetGearboxesOfTransportQuery,
  useGetFuelOfTransportQuery,
  useGetDriverTypesOfTransportQuery,
  useGetCurrentCarQuery,
  useGetCarImagesQuery
} = autoRiaApi
