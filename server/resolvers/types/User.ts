import { UserResolvers } from '../../../generated/server';
import { prisma } from '../../lib/prisma';
import { checkUserPermissionsOrThrow } from '../../lib/utils';

export const User: UserResolvers = {
  posts: async (parent, _args, { user }) => {
    checkUserPermissionsOrThrow(user);
    return prisma.post.findMany({
      where: {
        OR: [{ userId: user.id }, { userId: parent.id, isDraft: false }],
      },
    });
  },
};
