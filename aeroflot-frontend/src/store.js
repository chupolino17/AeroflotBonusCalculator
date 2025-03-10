import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'
import airportReducer from './slices/airportsSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    ticket: searchReducer,
    airport: airportReducer,
    auth: authReducer
  },
})
