import { UserResolvers } from '../../generated/graphql';
import { prisma } from '../../lib/prisma';

export const User: UserResolvers = {
  posts: async parent => {
    return prisma.post.findMany({
      where: { userId: parent.id },
    });
  },
};
