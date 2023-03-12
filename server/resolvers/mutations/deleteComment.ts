import { MutationResolvers } from '../../../generated/server';
import { checkUserPermissionsOrThrow } from '../../lib/utils';
import { prisma } from '../../prisma';

export const deleteComment: MutationResolvers['deleteComment'] = async (
  _parent,
  { input },
  { user },
) => {
  checkUserPermissionsOrThrow(user);

  const comment = await prisma.comment.delete({
    where: {
      idUserId: {
        id: input.id,
        userId: user.id,
      },
    },
  });

  return comment.id;
};
