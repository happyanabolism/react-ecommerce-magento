import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { StoreConfigProvider, ApolloProvider } from '@app/providers';
import { router } from '@app/routes/router';
import { persistor, store } from '@app/store/store';
import '../styles/index.scss'
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider>
          <StoreConfigProvider>
            <RouterProvider router={router} />
          </StoreConfigProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
