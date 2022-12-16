import { QueryResolvers } from '../../../generated/server';

export const currentUser: QueryResolvers['currentUser'] = (
  _parent,
  _args,
  { user },
) => {
  return user;
};
