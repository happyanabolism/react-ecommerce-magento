import { addListener, combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// ESM build: the CommonJS one (lib/) breaks default import interop in Vite 8
import storage from 'redux-persist/es/storage';
import { sessionReducer } from '@entities/session';
import {
  notificationListener,
  notificationReducer,
} from '@entities/notification';

const sessionPersistConfig = {
  key: 'session',
  storage,
};

const persistSessionReducer = persistReducer(
  sessionPersistConfig,
  sessionReducer
);

const rootReducer = combineReducers({
  session: persistSessionReducer,
  notification: notificationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(notificationListener.middleware),
});

export const persistor = persistStore(store);

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}
