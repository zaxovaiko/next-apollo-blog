import { MutationResolvers } from '../../../generated/server';
import { ErrorNames } from '../../lib/enums';
import { prisma } from '../../lib/prisma';
import { checkUserPermissionsOrThrow } from '../../lib/utils';

export const createComment: MutationResolvers['createComment'] = async (
  _parent,
  { input },
  { user },
) => {
  checkUserPermissionsOrThrow(user);

  if (input.text.length > 250 || input.text.length < 1) {
    throw new Error(ErrorNames.InvalidCommentLength);
  }

  const post = await prisma.post.findFirstOrThrow({
    where: { id: input.postId, isDraft: false },
  });

  if (post?.isDraft) {
    throw new Error(ErrorNames.CanNotCreateCommentOnDraftPost);
  }

  return prisma.comment.create({
    data: {
      ...input,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};
