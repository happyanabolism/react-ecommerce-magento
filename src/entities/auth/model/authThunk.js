import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateAuthToken } from '@entities/auth';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, client }) => {
    const token = await generateAuthToken(client, email, password);
    return token;
  }
);
