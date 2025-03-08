import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  airports: [{label:'Loading...', code:'000'}],
};

export const airportsSlice = createSlice({
    name: 'airports',
    initialState,
    reducers: {
        setAirports: (state, action) => {
          state.airports = action.payload;
        },
    },
  });

  export const {
    setAirports
  } = airportsSlice.actions;

  export default airportsSlice.reducer;