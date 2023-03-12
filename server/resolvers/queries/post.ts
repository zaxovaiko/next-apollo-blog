import { QueryResolvers } from '../../../generated/server';
import { prisma } from '../../prisma';

export const post: QueryResolvers['post'] = async (_parent, { input }) => {
  return prisma.post.findFirstOrThrow({
    where: {
      id: input.id,
      isDraft: false,
    },
  });
};
