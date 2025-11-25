import type { ApolloClient } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  generateAuthToken,
  createCustomer,
  fetchCustomer,
} from '@entities/customer';
import type { CustomerCreateInput } from './types';

export const login = createAsyncThunk(
  'customer/login',
  async ({
    client,
    email,
    password,
  }: {
    client: ApolloClient;
    email: string;
    password: string;
  }) => {
    const token = await generateAuthToken(client, email, password);
    if (!token) {
      throw new Error('Customer login failed!');
    }

    const customer = await fetchCustomer(client, token);

    return { token, customer };
  }
);

export const register = createAsyncThunk(
  'customer/register',
  async ({
    client,
    registrationData,
  }: {
    client: ApolloClient;
    registrationData: CustomerCreateInput;
  }) => {
    const customer = await createCustomer(client, registrationData);
    if (!customer) {
      throw new Error('Customer creation failed!');
    }

    const token = await generateAuthToken(
      client,
      customer.email,
      registrationData.password
    );

    return { token, customer };
  }
);
