import { ApolloProvider } from './providers/ApolloProvider';
import { AppRouter } from './routers/AppRouter';
import './styles/index.scss';

export function App() {
  return (
    <ApolloProvider>
      <AppRouter />
    </ApolloProvider>
  );
}
