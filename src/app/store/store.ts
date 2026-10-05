import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
import { customerReducer } from '@entities/customer';
import { sessionReducer } from '@entities/session';

const customerPersistConfig = {
  key: 'customer',
  storage,
};

const persistCustomerReducer = persistReducer(
  customerPersistConfig,
  customerReducer
);

const sessionPersistConfig = {
  key: 'session',
  storage,
};

const persistSessionReducer = persistReducer(
  sessionPersistConfig,
  sessionReducer
);

const rootReducer = combineReducers({
  customer: persistCustomerReducer,
  session: persistSessionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}
