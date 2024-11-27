import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/95218/ido_graph/v3.0.2', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
