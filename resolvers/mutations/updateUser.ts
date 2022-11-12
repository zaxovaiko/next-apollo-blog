import { AuthenticationError, ValidationError } from 'apollo-server-micro';
import { isNil, omitBy } from 'lodash';

import { MutationResolvers } from '../../generated/graphql';
import { DEFAULT_USER_AVATAR, ErrorNames } from '../../lib/enums';
import { prisma } from '../../lib/prisma';

export const updateUser: MutationResolvers['updateUser'] = async (
  _parent,
  { input },
  { user },
) => {
  if (!user) {
    throw new AuthenticationError(ErrorNames.Unauthenticated);
  }

  const { username, avatar } = input;
  if (username && username !== user.username) {
    const existingUser = await prisma.user.findFirst({ where: { username } });
    if (existingUser) {
      throw new ValidationError(ErrorNames.UserAlreadyExists);
    }
  }

  return prisma.user.update({
    where: { id: user.id },
    data: {
      ...omitBy(
        { ...input, avatar: avatar === '' ? DEFAULT_USER_AVATAR : avatar },
        isNil,
      ),
      updatedAt: new Date(),
    },
  });
};
