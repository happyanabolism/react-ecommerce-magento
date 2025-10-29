import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ApolloProvider, StoreProvider } from '@app/providers';
import { router } from '../routes/router';
import '../styles/index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </ApolloProvider>
  </StrictMode>
);
