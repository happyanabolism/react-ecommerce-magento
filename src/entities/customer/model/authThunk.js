import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  generateAuthToken,
  createCustomer,
  fetchCustomer,
} from '@entities/customer';

export const login = createAsyncThunk(
  'customer/login',
  async ({ client, email, password }) => {
    // TODO: reject with value
    const token = await generateAuthToken(client, email, password);
    const customer = await fetchCustomer(client, token);

    return { token, customer };
  }
);

export const register = createAsyncThunk(
  'customer/register',
  async ({ client, registrationData }) => {
    const customer = await createCustomer(client, registrationData);
    const token = await generateAuthToken(
      client,
      customer.email,
      registrationData.password
    );

    return { token, customer };
  }
);
