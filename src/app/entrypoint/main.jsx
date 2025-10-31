import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { StoreProvider, ApolloProvider } from '@app/providers';
import { router } from '@app/routes/router';
import { store } from '@app/store/store';
import '../styles/index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider>
        <StoreProvider>
          <RouterProvider router={router} />
        </StoreProvider>
      </ApolloProvider>
    </Provider>
  </StrictMode>
);
