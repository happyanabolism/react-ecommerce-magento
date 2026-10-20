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
import { sessionReducer } from '@entities/session';
import { recentlyViewedProductsReducer } from '@widgets/recently-viewed-products';

const sessionPersistConfig = {
  key: 'session',
  storage,
};

const persistSessionReducer = persistReducer(
  sessionPersistConfig,
  sessionReducer
);

const recentlyViewedProductsPersistConfig = {
  key: 'recently-viewed-products',
  storage,
};

const persistRecentlyViewedProductsReducer = persistReducer(
  recentlyViewedProductsPersistConfig,
  recentlyViewedProductsReducer
);

const rootReducer = combineReducers({
  session: persistSessionReducer,
  recentlyViewedProducts: persistRecentlyViewedProductsReducer,
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
