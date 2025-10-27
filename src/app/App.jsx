import { ApolloProvider } from "./providers";
import { AppRouter } from "./routers";
import "./styles/index.scss"

export function App() {
  return (
    <ApolloProvider>
      <AppRouter />
    </ApolloProvider>
  );
}