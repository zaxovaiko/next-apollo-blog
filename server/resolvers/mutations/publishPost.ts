import { MutationResolvers } from '../../../generated/server';
import { ErrorNames } from '../../lib/enums';
import { prisma } from '../../lib/prisma';
import { checkUserPermissionsOrThrow } from '../../lib/utils';

export const publishPost: MutationResolvers['publishPost'] = async (
  _,
  { input },
  { user },
) => {
  checkUserPermissionsOrThrow(user);

  const post = await prisma.post.findFirstOrThrow({
    where: { id: input.id, userId: user.id },
  });

  if (!post.title) {
    throw new Error(ErrorNames.PostTitleIsRequired);
  }

  return prisma.post.update({
    where: { id: input.id },
    data: { isDraft: false },
  });
};
