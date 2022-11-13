import { QueryResolvers } from '../../generated/graphql';
import { prisma } from '../../lib/prisma';

export const posts: QueryResolvers['posts'] = () => {
  return prisma.post.findMany({ where: { isDraft: false } });
};
