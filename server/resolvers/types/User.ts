import { UserResolvers } from '../../../generated/server';
import { checkUserPermissionsOrThrow } from '../../lib/utils';
import { prisma } from '../../prisma';

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
