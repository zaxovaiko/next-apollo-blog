import { QueryResolvers } from '../../../generated/server';
import { prisma } from '../../lib/prisma';

export const comments: QueryResolvers['comments'] = () => {
  return prisma.comment.findMany();
};
