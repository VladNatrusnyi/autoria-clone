import {createSlice} from "@reduxjs/toolkit";
import is from 'is_js'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    result: [],
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
    },

    setFilteringQueryString(state, action) {
      const params = state.filteringParams

      if (state.result.length) { state.result = []}

      Object.keys(params).map(item => {
        if (params[item] && !is.object(params[item])) {
          state.result.push(`${item}=${params[item]}`)
        } else if (is.object(params[item])) {
          const objectParams = params[item]
          Object.keys(objectParams).map(item => {
            if (objectParams[item]) {
              state.result.push(`${item}=${objectParams[item]}`)
            }
          })
        }
      })
    }
  },
})

// export const getUser = createAsyncThunk(
//   'auth/getUser',
//   (_, {dispatch, getState}) => {
//     if (getState().auth.user.displayName) {
//       apiDB.get(`users.json?orderBy="uid"&equalTo=${JSON.stringify(getState().auth.user.uid)}`)
//         .then(function (response) {
//           const data = Object.keys(response.data).map(item => response.data[item])
//           // console.log('Users DATA2', data);
//           console.log('Data for detCurrentUser1', data[0])
//           dispatch(getCurrentUser(data[0]))
//         })
//         .catch(function (error) {
//           console.log('Дані юзера у БД  НЕ Змінені',error);
//         });
//     }
//   }
// )

export const {
  setFilterPrams,
  setFilteringQueryString
} = filtersSlice.actions

export default filtersSlice.reducer
