import { createSlice } from '@reduxjs/toolkit';

import {apiClient} from '../service/config'

const initialState = {
  isLoggedIn: false,
  isProfileOpened: false,
  user: {
    username: null,
    email_period: 1,
    is_subscriber: false,
    date_joined: null
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsProfileOpened: (state, action) => {
      state.isProfileOpened = action.payload;
    },
    setIsSubscriber: (state, action) => {
      apiClient.post('user/change', {is_subscriber: action.payload})
      .then(
        state.user.is_subscriber = action.payload,
        localStorage.setItem('user', JSON.stringify(state.user))
      )
      .catch(error => console.error(error));
    },
    setEmailPeriod: (state, action) => {
      apiClient.post('user/change', {email_period: action.payload})
      .then(
        state.user.email_period = action.payload,
        localStorage.setItem('user', JSON.stringify(state.user))
      )
      .catch(error => console.error(error));
    },
  },
});

export const {
    setIsLoggedIn,
    setUser,
    setIsProfileOpened,
    setIsSubscriber,
    setEmailPeriod
} = authSlice.actions;

export default authSlice.reducer;