import { MutationResolvers } from '../../generated/server';
import { fireAuth } from '../../lib/firebase';
import { prisma } from '../../lib/prisma';
import { checkUserPermissionsOrThrow } from '../../lib/utils';

export const deleteUser: MutationResolvers['deleteUser'] = async (
  _parent,
  _args,
  { user },
) => {
  checkUserPermissionsOrThrow(user);

  await fireAuth.deleteUser(user.uid);
  await prisma.user.update({
    where: { id: user.id },
    data: { inactive: true },
  });

  return { ...user, inactive: true };
};
