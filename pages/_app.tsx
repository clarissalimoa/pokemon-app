import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { createContext } from "react";

export const AppContext = createContext(null);

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
