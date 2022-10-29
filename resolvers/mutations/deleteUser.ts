import { AuthenticationError } from 'apollo-server-micro';

import { MutationResolvers } from '../../generated/graphql';
import { ErrorNames, FirestoreCollections } from '../../lib/enums';
import { fireStore } from '../../lib/firebase';

export const deleteUser: MutationResolvers['deleteUser'] = async (
  _parent,
  _args,
  { user },
) => {
  if (!user) {
    throw new AuthenticationError(ErrorNames.Unauthenticated);
  }

  await fireStore.collection(FirestoreCollections.Users).doc(user.id).update({
    inactive: true,
  });

  return { ...user, inactive: true };
};
