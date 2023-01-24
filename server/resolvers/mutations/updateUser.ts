import { ValidationError } from 'apollo-server-micro';
import { MutationResolvers } from 'generated/server';
import { isNil, omitBy } from 'lodash';
import { DEFAULT_USER_AVATAR, ErrorNames } from 'server/lib/enums';
import { prisma } from 'server/lib/prisma';
import { checkUserPermissionsOrThrow } from 'server/lib/utils';

export const updateUser: MutationResolvers['updateUser'] = async (
  _parent,
  { input },
  { user },
) => {
  checkUserPermissionsOrThrow(user);

  const { displayName, avatar } = input;

  if (displayName && displayName.trim() === '') {
    throw new ValidationError(ErrorNames.UserAlreadyExists);
  }

  return prisma.user.update({
    where: { id: user.id },
    data: {
      ...omitBy(
        {
          ...input,
          avatar: avatar === '' ? DEFAULT_USER_AVATAR : avatar,
          displayName: displayName?.trim(),
        },
        isNil,
      ),
      updatedAt: new Date(),
    },
  });
};
