import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ApolloProvider } from '../providers/ApolloProvider';
import { router } from '../routes/router';
import '../styles/index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
