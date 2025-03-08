import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'
import airportReducer from './slices/airportsSlice'

export const store = configureStore({
  reducer: {
    ticket: searchReducer,
    airport: airportReducer
  },
})
