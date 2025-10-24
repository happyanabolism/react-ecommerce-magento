import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.jsx';
import ApolloProvider from '@app/ApolloProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
