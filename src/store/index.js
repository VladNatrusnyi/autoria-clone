import {configureStore} from "@reduxjs/toolkit";
import {autoRiaApi} from "./queries/autoRiaApi";
import filtersSlice from "./filters/filtersSlice";

export const store = configureStore({
  reducer: {
    filters: filtersSlice,
    [autoRiaApi.reducerPath]: autoRiaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(autoRiaApi.middleware),
})
