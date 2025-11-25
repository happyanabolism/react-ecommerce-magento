import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '@entities/customer';
import type { AuthState } from './types';

const initialState: AuthState = {
  customer: null,
  jwt: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    logout: () => ({ ...initialState }),
    clearError(state) {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.customer = action.payload.customer;
        state.jwt = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.customer = action.payload.customer;
        state.jwt = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export const customerReducer = authSlice.reducer;
