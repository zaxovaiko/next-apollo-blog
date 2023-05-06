import { UserResolvers } from '../../../generated/server';
import { checkUserPermissionsOrThrow } from '../../lib/utils';
import { prisma } from '../../prisma';

export const User: UserResolvers = {
  posts: async (parent, { input = {} }, { user }) => {
    checkUserPermissionsOrThrow(user);

    const rows = await prisma.post.findMany({
      where:
        user.id === parent.id
          ? { userId: user.id }
          : { userId: parent.id, isDraft: false },
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
  },
  comments: async (parent, { input = {} }, { user }) => {
    checkUserPermissionsOrThrow(user);

    const rows = await prisma.comment.findMany({
      where: { userId: parent.id },
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
  },
};
