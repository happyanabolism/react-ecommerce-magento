import { createSlice } from '@reduxjs/toolkit';
import { login } from '@entities/customer';

const initialState = {
  customer: null,
  jwt: null,
  status: 'idle',
  error: null,
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    logout() {
      initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.jwt = action.payload.jwt;
        state.customer = action.payload.customer;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const { logout } = customerSlice.actions;
export const customerReducer = customerSlice.reducer;
