import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import is from 'is_js'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedParameters: [],
    paramsString: '',
    currencyTypes: [
      {
        value: '1',
        label: '$',
      },
      {
        value: '2',
        label: '₴',
      },
      {
        value: '3',
        label: '€',
      },
    ],
    filteringParams: {
      page: '0',
      category_id: 0,
      marka_id: null,
      model_id: null,
      location: {
        state: null,
        city: null
      },
      price: {
        price_ot: '',
        price_do: '',
        currency: '1'
      },
      years: {
        s_yers: null,
        po_yers: null
      }
    },
  },
  reducers: {
    setFilterPrams(state, action) {
      if (action.payload.type === 'CATEGORY') {
        state.filteringParams.category_id = action.payload.data
      }
      if (action.payload.type === 'MARKA') {
        state.filteringParams.marka_id = action.payload.data
      }
      if (action.payload.type === 'MODEL') {
        state.filteringParams.model_id = action.payload.data
      }
      if (action.payload.type === 'STATE') {
        state.filteringParams.location.state = action.payload.data
      }
      if (action.payload.type === 'PRICE') {
        state.filteringParams.price = action.payload.data
      }
      if (action.payload.type === 'YEARS') {
        state.filteringParams.years = action.payload.data
      }
      if (action.payload.type === 'PAGE') {
        state.filteringParams.page = action.payload.data
      }
    },

    setFilteringQueryString(state, action, dispatch) {
      const params = state.filteringParams

      if (state.selectedParameters.length) { state.selectedParameters = []}

      Object.keys(params).map(item => {
        if (params[item] && !is.object(params[item])) {
          state.selectedParameters.push(`${item}=${params[item]}`)
        } else if (is.object(params[item])) {
          const objectParams = params[item]
          Object.keys(objectParams).map(item => {
            if (objectParams[item]) {
              state.selectedParameters.push(`${item}=${objectParams[item]}`)
            }
          })
        }
      })


      if (state.selectedParameters.length) {
        state.paramsString = state.selectedParameters.join('&')
      }
    },


    clearParamsString(state, action) {
      state.paramsString = ''
    }
  },
})

export const {
  setFilterPrams,
  setFilteringQueryString,
  clearParamsString
} = filtersSlice.actions

export default filtersSlice.reducer
