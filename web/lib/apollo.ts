import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql', // TODO: Change to env variable
  cache: new InMemoryCache(),
});
