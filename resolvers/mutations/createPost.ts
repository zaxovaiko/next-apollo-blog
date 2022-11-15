import { MutationResolvers } from '../../generated/server';
import { ErrorNames } from '../../lib/enums';
import { prisma } from '../../lib/prisma';

export const createPost: MutationResolvers['createPost'] = async (
  _,
  { input },
  { user },
) => {
  if (!user) {
    throw new Error(ErrorNames.Unauthenticated);
  }
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
