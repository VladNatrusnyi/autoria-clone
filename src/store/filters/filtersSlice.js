import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import is from 'is_js'

const filters = {
  page: '0',
  category_id: 0,
  bodystyle: [],
  markArr: [{markFilterId: 1, marka_id: null, model_id: null, s_yers: null, po_yers: null}],
  location: [],
  price_ot: '',
  price_do: '',
  currency: '1',
  raceTo: '',
  raceFrom: '',
  gearbox: [],
  type: [],
  driverTypes: [],
  engineVolumeFrom: '',
  engineVolumeTo: '',
  abroad: '0',
  auto_repairs: 0,
  saledParam: 0,
  top: '0'
  // custom: []
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedParameters: null,
    paramsString: '',
    currencyTypes: [
      {
        value: '1',
        label: '$',
      },
      {
        value: '2',
        label: '€',
      },
      {
        value: '3',
        label: '₴',
      },
    ],
    filteringParams: filters
  },
  reducers: {
    setFilterPrams(state, action) {
      switch (action.payload.type) {
        case 'CATEGORY':
          state.filteringParams.category_id = action.payload.data
          break;
        case 'BODYSTYLE':
          state.filteringParams.bodystyle = action.payload.data
          // state.filteringParams.bodystyle = [...new Set([...state.filteringParams.bodystyle, ...action.payload.data])]
          break;
        case 'MARKARR':
          const payload = action.payload.data
          if (payload.identifier === 'clear') {
            state.filteringParams.markArr = [{markFilterId: 1, marka_id: null, model_id: null, s_yers: null, po_yers: null}]
            return
          }
          const isExist = state.filteringParams.markArr.some(el => el.markFilterId === payload.markFilterId)

          if (isExist) {
            const foundedEl = state.filteringParams.markArr
              .find(el => el.markFilterId === payload.markFilterId)
            if (payload.identifier === 'mark') {
              foundedEl.marka_id = payload.value
            }
            if (payload.identifier === 'model') {
              foundedEl.model_id = payload.value
            }
            if (payload.identifier === 'year') {
              foundedEl.s_yers = payload.value.s_yers
              foundedEl.po_yers = payload.value.po_yers
            }
          }
          break;
        case 'LOCATION':
          state.filteringParams.location = action.payload.data
          break;
        case 'PRICE':
          state.filteringParams.price_ot = action.payload.data.price_ot
          state.filteringParams.price_do = action.payload.data.price_do
          state.filteringParams.currency = action.payload.data.currency
          break;
        case 'RACE':
          state.filteringParams.raceTo = action.payload.data.raceTo
          state.filteringParams.raceFrom = action.payload.data.raceFrom
          break;
        case 'PAGE':
          state.filteringParams.page = action.payload.data.toString()
          break;
        case 'GEARBOX':
          state.filteringParams.gearbox = action.payload.data
          break;
        case 'TYPE':
          state.filteringParams.type = action.payload.data
          break;
        case 'DRIVERTYPE':
          state.filteringParams.driverTypes = action.payload.data
          break;
        case 'ENGINEVOLUME':
          state.filteringParams.engineVolumeFrom = action.payload.data.engineVolumeFrom
          state.filteringParams.engineVolumeTo = action.payload.data.engineVolumeTo
          break;
        case 'ABROAD':
          state.filteringParams.abroad = action.payload.data
          break;
        case 'AUTOREPAIRS':
          state.filteringParams.auto_repairs = action.payload.data
          break;
        case 'SOLD':
          state.filteringParams.saledParam = action.payload.data
          break;
        case 'TOP':
          state.filteringParams.top = action.payload.data
          break;
        // case 'CUSTOM':
        //   state.filteringParams.custom = action.payload.data
        //   break;
        default:
          break;
      }
    },


    setFilteringQueryString(state, action, dispatch) {
      const params = state.filteringParams

      if (state.selectedParameters) { state.selectedParameters = null}

      const arrayOfObjects = Object.keys(params).map(item => {
        if (params[item] && !Array.isArray(params[item])) {
          return {[item]: params[item]}
        }

        if (params[item] && Array.isArray(params[item])) {
          if (item === 'bodystyle') {
            const arrayOfObjects = params[item].map((el, index) => ({[`bodystyle[${index.toString()}]`]: el}))
            return arrayOfObjects.reduce((acc, curr) => ({ ...acc, ...curr }), {});
          }

          if (item === 'markArr') {
            //масив об'єктів з правильними полями для пошуку
            return state.filteringParams.markArr.map(el => {
              if (el.marka_id && !el.model_id) {
                el.model_id = 0
              }
              return Object.keys(el).map(key => {
                return key !== 'markFilterId' && el[key] && { [`${key}[${el.markFilterId}]`]: el[key] }
              }).reduce((acc, curr) => ({ ...acc, ...curr }), {})
            }).reduce((acc, curr) => ({ ...acc, ...curr }), {});
          }

          if (item === 'location') {
            const location = params[item]

            return location.map((place, idx) => {
              const index = idx + 1
              if (place[1]) {
                return { [`state[${index}]`]: place[0], [`city[${index}]`]: place[1] }
              } else {
                return { [`state[${index}]`]: place[0], [`city[${index}]`]: 0 }
              }
            }).reduce((acc, curr) => ({ ...acc, ...curr }), {});
          }

          if (item === 'gearbox' && params[item].length) {
            return params[item].map((type, idx) => {
              return { [`gearbox[${idx}]`]: type }
            }).reduce((acc, curr) => ({ ...acc, ...curr }), {});
          }

          if (item === 'type' && params[item].length) {
            return params[item].map((type, idx) => {
              return { [`type[${idx}]`]: type }
            }).reduce((acc, curr) => ({ ...acc, ...curr }), {});
          }

          if (item === 'driverTypes' && params[item].length) {
            return params[item].map((type, idx) => {
              return { [`drive_type[${idx + 1}]`]: type }
            }).reduce((acc, curr) => ({ ...acc, ...curr }), {});
          }

          // if (item === 'custom' && params[item].length) {
          //   return params[item].map((type, idx) => {
          //     return { [`custom`]: type }
          //   }).reduce((acc, curr) => ({ ...acc, ...curr }), {});
          // }
        }
        // [${idx + 1}]


        // if (params[item] && !is.object(params[item] && !Array.isArray(params[item]))) {
        //   state.selectedParameters.push(`${item}=${params[item]}`)
        // } else if (is.object(params[item])) {
        //   const objectParams = params[item]
        //   Object.keys(objectParams).map(item => {
        //     if (objectParams[item]) {
        //       state.selectedParameters.push(`${item}=${objectParams[item]}`)
        //     }
        //   })
        // }
      })


      state.selectedParameters = arrayOfObjects.reduce((acc, curr) => ({ ...acc, ...curr }), {});

      //Формування рядка (треба тільеи один раз)
      if (state.selectedParameters) {
        const params = state.selectedParameters

        state.paramsString = Object.keys(params).map(item => {
            return `${item}=${params[item]}`
          }).join('&')
      }
    },


    clearParamsString(state, action) {
      state.paramsString = ''
    },


    changeFilterParams(state, action) {

      const payload = action.payload
      //bodystyle
      const payloadBodyStyle = Object.keys(payload).filter(key => key.includes('bodystyle')).map(key => payload[key])

      //gearbox
      const payloadGearBox = Object.keys(payload).filter(key => key.includes('gearbox')).map(key => payload[key])

      //fuel
      const payloadFuel = Object.keys(payload).filter(key => key.includes('type')).map(key => payload[key])

      //fuel
      const payloadDriverTypes = Object.keys(payload).filter(key => key.includes('drive_type')).map(key => payload[key])

      // //custom
      // const payloadCustom = Object.keys(payload).filter(key => key.includes('custom')).map(key => payload[key])

      //marks
      const payloadMarks = Object.keys(payload).filter(key => {
        return key.includes('marka_id') || key.includes('model_id') || key.includes('po_yers')|| key.includes('s_yers')
      })
      const identifiers = [...new Set(payloadMarks.map(el => el[el.indexOf('%5D') - 1]))]
      const finalMarkObjects = identifiers.map(el => {
        const keys = payloadMarks.filter(item => item.includes(`%5B${el}%5D`))
        return keys.map(el => {
          const key = el.slice(0, el.indexOf('%5B'))
          return{  [key]: payload[el] }
        }).reduce((acc, curr) => ({ ...acc, ...{...curr, markFilterId: +el } }), {})
      })

      const template = {markFilterId: 1, marka_id: null, model_id: null, s_yers: null, po_yers: null}
      const markArrResult = finalMarkObjects.map(item => {
        return {
          ...template,
          ...item
        }
      })

      //location
      const payloadLocations = Object.keys(payload).filter(key => {
        return key.includes('state') || key.includes('city')
      })

      const identifiersLocation = [...new Set(payloadLocations.map(el => el[el.indexOf('%5D') - 1]))]

      const finalLocationArray = identifiersLocation.map(el => {
        const keys = payloadLocations.filter(item => item.includes(`%5B${el}%5D`))

        return payload[`city%5B${el}%5D`] === 0 ? [ payload[`state%5B${el}%5D`] ] : [ payload[`state%5B${el}%5D`],  payload[`city%5B${el}%5D`]]

        // return [ payload[`state%5B${el}%5D`],  payload[`city%5B${el}%5D`]]

      })


      const notArrayPayload = Object.keys(payload)
        .filter(key => !key.includes('bodystyle')
          && !key.includes('marka_id')
          && !key.includes('model_id')
          && !key.includes('s_yers')
          && !key.includes('po_yers')
          && !key.includes('state')
          && !key.includes('gearbox')
          && !key.includes('type')
          && !key.includes('drive_type')
          // && !key.includes('custom')
          && !key.includes('city'))
        .reduce((acc, curr) => ({ ...acc, ...{[curr]: payload[curr]} }), {})

      const final = {
        ...notArrayPayload,
        bodystyle: payloadBodyStyle,
        gearbox: payloadGearBox,
        type: payloadFuel,
        driverTypes:payloadDriverTypes,
        // custom: payloadCustom,
        markArr: finalMarkObjects.length ? markArrResult : [template],
        location: finalLocationArray
      }

      state.filteringParams = {
        ...state.filteringParams,
        ...final
      }
    },



    addAnotherMark(state, action) {
      const arrLength = state.filteringParams.markArr.length
      const template = {markFilterId: arrLength + 1, marka_id: null, model_id: null, s_yers: null, po_yers: null}

      state.filteringParams.markArr.push(template)
    },

    deleteMarkBlock(state, action) {
      state.filteringParams.markArr = state.filteringParams.markArr.filter(el => el.markFilterId !== action.payload)
    },


    clearFilters(state, action) {
      state.filteringParams = filters
    }

  },
})

export const {
  setFilterPrams,
  setFilteringQueryString,
  clearParamsString,
  changeFilterParams,
  addAnotherMark,
  deleteMarkBlock,
  clearFilters
} = filtersSlice.actions

export default filtersSlice.reducer
