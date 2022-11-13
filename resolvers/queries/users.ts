import { QueryResolvers } from '../../generated/graphql';
import { prisma } from '../../lib/prisma';

export const users: QueryResolvers['users'] = () => {
  return prisma.user.findMany({
    where: { inactive: false },
  });
};
