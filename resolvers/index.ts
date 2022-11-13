import * as Mutation from './mutations';
import * as Query from './queries';
import * as Types from './types';

export const resolvers = {
  Query,
  Mutation,
  ...Types,
};
