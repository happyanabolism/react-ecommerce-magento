import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customer: null,
  loading: false,
  error: null,
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
});

export const customerReducer = customerSlice.reducer;
