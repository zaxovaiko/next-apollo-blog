import { AuthenticationError } from 'apollo-server-micro';

import { MutationResolvers } from '../../generated/graphql';
import { ErrorNames } from '../../lib/enums';
import { fireAuth } from '../../lib/firebase';
import { prisma } from '../../lib/prisma';

export const deleteUser: MutationResolvers['deleteUser'] = async (
  _parent,
  _args,
  { user },
) => {
  if (!user) {
    throw new AuthenticationError(ErrorNames.Unauthenticated);
  }

  await fireAuth.deleteUser(user.uid);
  await prisma.user.update({
    where: { id: user.id },
    data: { inactive: true },
  });

  return { ...user, inactive: true };
};
