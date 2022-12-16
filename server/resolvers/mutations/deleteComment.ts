import { MutationResolvers } from '../../../generated/server';
import { prisma } from '../../lib/prisma';
import { checkUserPermissionsOrThrow } from '../../lib/utils';

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
