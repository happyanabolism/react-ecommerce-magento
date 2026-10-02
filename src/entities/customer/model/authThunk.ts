import type { ApolloClient } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateAuthToken, createCustomer } from '@entities/customer';
import { getMagentoErrorMessage } from '@shared/utils';
import type { CustomerCreateInput } from '@shared/api/gql/graphql';

// rejected actions carry the error message to show in the form
const createAuthThunk = createAsyncThunk.withTypes<{ rejectValue: string }>();

export const login = createAuthThunk(
  'customer/login',
  async (
    {
      client,
      email,
      password,
    }: {
      client: ApolloClient;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = await generateAuthToken(client, { email, password });
      if (!token) {
        return rejectWithValue('Customer login failed!');
      }

      return { token };
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      return rejectWithValue(getMagentoErrorMessage(error));
    }
  }
);

export const register = createAuthThunk(
  'customer/register',
  async (
    {
      client,
      registrationData,
    }: {
      client: ApolloClient;
      registrationData: CustomerCreateInput & { password: string };
    },
    { rejectWithValue }
  ) => {
    try {
      const customer = await createCustomer(client, registrationData);
      if (!customer) {
        return rejectWithValue('Customer creation failed!');
      }

      const token = await generateAuthToken(client, {
        email: registrationData.email,
        password: registrationData.password,
      });

      return { token };
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      return rejectWithValue(getMagentoErrorMessage(error));
    }
  }
);
