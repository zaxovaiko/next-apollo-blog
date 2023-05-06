import { QueryResolvers } from '../../../generated/server';
import { prisma } from '../../prisma';

export const user: QueryResolvers['user'] = (_parent, { input }) => {
  return prisma.user.findFirstOrThrow({ where: { uid: input.uid } });
};
