import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  name: null,
  loading: false,
  error: null,
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    startLogin(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.token = action.payload.token;
    },

    logout() {
      return initialState;
    },
  },
});

export const { loginSuccess, logout } = customerSlice.actions;
export const customerReducer = customerSlice.reducer;
