import { QueryResolvers } from '../../../generated/server';
import { prisma } from '../../prisma';

export const post: QueryResolvers['post'] = async (
  _parent,
  { input },
  { user },
) => {
  return prisma.post.findFirstOrThrow({
    where: {
      id: input.id,
      OR: [{ userId: user?.id, isDraft: true }, { isDraft: false }],
    },
  });
};
