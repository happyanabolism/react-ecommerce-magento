import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { StoreConfigProvider, ApolloProvider } from '@app/providers';
import { router } from '@app/routes/router';
import { persistor, store } from '@app/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/index.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
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
