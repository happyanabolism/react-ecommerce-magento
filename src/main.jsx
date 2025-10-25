import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ApolloProvider from '@app/ApolloProvider';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </StrictMode>
);
