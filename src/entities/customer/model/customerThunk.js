import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateAuthToken } from '@entities/customer';
import { fetchCustomer } from '../api/customerApi';

export const login = createAsyncThunk(
  'customer/login',
  async ({ email, password, client }) => {
    // TODO: reject with value
    const token = await generateAuthToken(client, email, password);
    const customer = await fetchCustomer(client, token);

    return { token, customer };
  }
);
