import { AuthenticationError, ValidationError } from 'apollo-server-micro';

import { MutationResolvers } from '../../generated/server';
import { DEFAULT_USER_AVATAR, ErrorNames } from '../../lib/enums';
import { prisma } from '../../lib/prisma';

export const createUser: MutationResolvers['createUser'] = async (
  _parent,
  { input },
  { decodedToken },
) => {
  if (!decodedToken) {
    throw new AuthenticationError(ErrorNames.TokenIdRequired);
  }

  const { username } = input;

  // TODO: Add validator like zod
  if (!username) {
    throw new ValidationError(ErrorNames.SomeDataIsRequired);
  }

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ username }, { uid: decodedToken.uid }] },
  });
  if (existingUser) {
    throw new ValidationError(ErrorNames.UserAlreadyExists);
  }

  return prisma.user.create({
    data: {
      avatar: input.avatar || DEFAULT_USER_AVATAR,
      createdAt: new Date(),
      firstName: input.firstName,
      id: decodedToken.uid,
      lastName: input.lastName,
      uid: decodedToken.uid,
      updatedAt: new Date(),
      username: input.username,
    },
  });
};
