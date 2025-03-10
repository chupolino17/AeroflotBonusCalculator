import { createSlice } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';

const initialState = {
  lastSearchList: [],
  searchState: {
    datetime_from: dayjs().format('DDMMYYYY'),
    code_from: 'SVO',
    code_to: 'LED',
    fare_class: 'economy',
    need_search: false,
    defaultAirportFrom: {label: "Loading...", code: '000'},
    defaultAirportTo: {label: "Loading...", code: '000'}
  }
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.lastSearchList = action.payload;
    },
    setCodeTo: (state, action) => {
      state.searchState.code_to = action.payload;
    },
    setCodeFrom: (state, action) => {
      state.searchState.code_from = action.payload;
    },
    setDefaultAirportTo: (state, action) => {
      state.searchState.defaultAirportTo = action.payload;
    },
    setDefaultAirportFrom: (state, action) => {
      state.searchState.defaultAirportFrom = action.payload;
    },
    setDateFrom: (state, action) => {
      state.searchState.datetime_from = action.payload;
    },
    setNeedSearch: (state, action) => {
      state.searchState.need_search = action.payload;
    },
    setFareClass: (state, action) => {
      state.searchState.fare_class = action.payload;
    },
  },
});

export const {
    setTickets,
    setCodeTo,
    setCodeFrom,
    setDateFrom,
    setNeedSearch,
    setFareClass,
    setDefaultAirportTo,
    setDefaultAirportFrom
} = searchSlice.actions;

export default searchSlice.reducer;