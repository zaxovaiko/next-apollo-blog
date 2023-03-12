import { QueryResolvers } from '../../../generated/server';
import { prisma } from '../../prisma';

export const users: QueryResolvers['users'] = async (_parent, { input }) => {
  const rows = await prisma.user.findMany({
    where: { inactive: false },
    cursor: input?.after ? { id: input.after } : undefined,
    take: (input?.first ?? 10) + 1,
    orderBy: { createdAt: 'desc' },
  });

  return {
    edges: rows
      .slice(0, input?.first ?? 10)
      .map(row => ({ cursor: row.id, node: row })),
    pageInfo: {
      hasMore: rows.length === (input?.first ?? 10) + 1,
      cursor: rows[rows.length - 1]?.id,
    },
  };
};
