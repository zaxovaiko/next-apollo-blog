import { UserResolvers } from '../../generated/graphql';
import { ErrorNames } from '../../lib/enums';
import { prisma } from '../../lib/prisma';

export const User: UserResolvers = {
  posts: async (parent, _args, { user }) => {
    if (!user) {
      throw new Error(ErrorNames.Unauthenticated);
    }
    return prisma.post.findMany({
      where: {
        OR: [{ userId: user.id }, { userId: parent.id, isDraft: false }],
      },
    });
  },
};
