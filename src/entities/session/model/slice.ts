import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  jwt: string | null;
}

const initialState: SessionState = {
  jwt: null,
};

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    logout: (state) => {
      state.jwt = null;
    },
  },
});

export const { setToken, logout } = slice.actions;
export const sessionReducer = slice.reducer;
