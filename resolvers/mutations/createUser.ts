import { ValidationError } from 'apollo-server-micro';

import { MutationResolvers } from '../../generated/graphql';
import { fireAuth } from '../../lib/firebase';

export const createUser: MutationResolvers['createUser'] = async (
  _parent,
  { input },
) => {
  const { username, email, avatar } = input;

  // TODO: Add validator like zod
  if (!username || !email) {
    throw new ValidationError('Username and email are required');
  }

  await fireAuth.createUser({
    email,
    photoURL: avatar,
  });

  return null;
};
