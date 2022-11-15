import { CommentResolvers } from '../../generated/server';
import { prisma } from '../../lib/prisma';

export const Comment: CommentResolvers = {
  post: async parent => {
    return prisma.post.findUniqueOrThrow({
      where: { id: parent.postId },
    });
  },
  user: async parent => {
    return prisma.user.findUniqueOrThrow({
      where: { id: parent.userId },
    });
  },
};
