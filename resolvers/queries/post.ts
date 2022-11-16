import { QueryResolvers } from '../../generated/server';
import { prisma } from '../../lib/prisma';

export const post: QueryResolvers['post'] = async (
  _parent,
  { input },
  { user },
) => {
  return prisma.post.findFirstOrThrow({
    where: {
      id: input.id,
      OR: [{ isDraft: false }, { userId: user?.id }],
    },
  });
};
