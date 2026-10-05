import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  type: 'error' | 'success' | 'info';
  message: string;
}

interface NotificationState {
  items: Notification[];
}

const MAX_NOTIFICATIONS = 3;

const initialState: NotificationState = {
  items: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: {
      reducer: (state, action: PayloadAction<Notification>) => {
        if (state.items.length >= MAX_NOTIFICATIONS) {
          state.items.shift();
        }
        state.items.push(action.payload);
      },
      prepare: (notification: Omit<Notification, 'id'>) => ({
        payload: {
          ...notification,
          id: nanoid(),
        },
      }),
    },
    removeNotification: (state, action: PayloadAction<Notification['id']>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
