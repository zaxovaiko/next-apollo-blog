import { QueryResolvers } from '../../generated/graphql';
import { prisma } from '../../lib/prisma';

export const comments: QueryResolvers['comments'] = () => {
  return prisma.comment.findMany();
};
