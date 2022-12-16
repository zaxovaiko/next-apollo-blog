import { QueryResolvers } from '../../../generated/server';
import { prisma } from '../../lib/prisma';

export const users: QueryResolvers['users'] = () => {
  return prisma.user.findMany({
    where: { inactive: false },
  });
};
