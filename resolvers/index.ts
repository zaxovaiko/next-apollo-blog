import { QueryResolvers } from '../generated/graphql';

const books: QueryResolvers['books'] = () => {
  return [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];
};

export const resolvers = {
  Query: {
    books,
  },
};
