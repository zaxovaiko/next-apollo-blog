import { QueryResolvers } from '../../generated/graphql';

export const currentUser: QueryResolvers['currentUser'] = (
  _parent,
  _args,
  { user },
) => {
  return user;
};
