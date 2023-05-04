import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: string[] }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        authorization: token,
        ...headers,
      },
    };
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_HOST,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
});
