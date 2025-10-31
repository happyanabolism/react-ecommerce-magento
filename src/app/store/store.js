import { configureStore } from '@reduxjs/toolkit';
import { customerReducer } from '@entities/customer';

export const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
});
