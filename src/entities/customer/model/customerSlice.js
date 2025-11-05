import { createSlice } from '@reduxjs/toolkit';
import { login } from '@entities/customer';

const initialState = {
  customer: null,
  jwt: null,
  loading: false,
  error: null,
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    logout: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.jwt = action.payload.token;
        state.customer = action.payload.customer;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = customerSlice.actions;
export const customerReducer = customerSlice.reducer;
