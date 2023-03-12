import { Post } from '@prisma/client';
import { isNil, omitBy } from 'lodash';

import { MutationResolvers } from '../../../generated/server';
import { checkUserPermissionsOrThrow } from '../../lib/utils';
import { prisma } from '../../prisma';

export const updatePost: MutationResolvers['updatePost'] = (
  _,
  { input },
  { user },
) => {
  checkUserPermissionsOrThrow(user);

  const updatePayload = omitBy(input, isNil) as Partial<Post>;
  return prisma.post.update({
    where: {
      idUserId: {
        id: input.id,
        userId: user.id,
      },
    },
    data: {
      ...updatePayload,
      updatedAt: new Date(),
    },
  });
};
