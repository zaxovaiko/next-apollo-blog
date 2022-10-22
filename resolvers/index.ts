import { QueryResolvers } from '../generated/graphql';

export const resolvers = {
  Query: {
    users: () => [],
    posts: () => [],
  } as QueryResolvers,
};
