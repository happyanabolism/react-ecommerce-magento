import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addNotification, removeNotification } from './notificationSlice';

const AUTO_HIDE_MS = 5000;

export const notificationListener = createListenerMiddleware();

notificationListener.startListening({
  actionCreator: addNotification,
  effect: async (action, api) => {
    if (action.payload.type === 'error') return;

    await api.delay(AUTO_HIDE_MS);
    api.dispatch(removeNotification(action.payload.id));
  },
});
