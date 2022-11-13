import { Post } from '@prisma/client';
import { isNil, omitBy } from 'lodash';

import { MutationResolvers } from '../../generated/graphql';
import { ErrorNames } from '../../lib/enums';
import { prisma } from '../../lib/prisma';

export const updatePost: MutationResolvers['updatePost'] = (
  _,
  { input },
  { user },
) => {
  if (!user) {
    throw new Error(ErrorNames.Unauthenticated);
  }

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
