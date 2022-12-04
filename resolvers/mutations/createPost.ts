import { MutationResolvers } from '../../generated/server';
import { prisma } from '../../lib/prisma';
import { checkUserPermissionsOrThrow } from '../../lib/utils';

export const createPost: MutationResolvers['createPost'] = async (
  _,
  { input },
  { user },
) => {
  checkUserPermissionsOrThrow(user);

  const { title, images, content, previewImage } = input;
  return prisma.post.create({
    data: {
      title,
      content,
      previewImage,
      isDraft: true,
      userId: user.id,
      images: images || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};
