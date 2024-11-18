import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/95218/ido_graph/v', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
