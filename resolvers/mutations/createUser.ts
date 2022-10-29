import { AuthenticationError, ValidationError } from 'apollo-server-micro';
import { isNil, omitBy } from 'lodash';

import { MutationResolvers, User } from '../../generated/graphql';
import {
  DEFAULT_USER_AVATAR,
  ErrorNames,
  FirestoreCollections,
} from '../../lib/enums';
import { fireStore } from '../../lib/firebase';

export const createUser: MutationResolvers['createUser'] = async (
  _parent,
  { input },
  { decodedToken },
) => {
  if (!decodedToken) {
    throw new AuthenticationError(ErrorNames.TokenIdRequired);
  }

  const { username, email } = input;

  // TODO: Add validator like zod
  if (!username || !email) {
    throw new ValidationError(ErrorNames.SomeDataIsRequired);
  }

  const oldUser = await fireStore
    .collection(FirestoreCollections.Users)
    .doc(decodedToken.uid)
    .get();
  if (oldUser.exists) {
    throw new ValidationError(ErrorNames.UserAlreadyExists);
  }

  const userPayload: User = {
    avatar: DEFAULT_USER_AVATAR,
    ...(omitBy(input, isNil) as Pick<User, 'username' | 'email'>),
    id: decodedToken.uid,
    inactive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await fireStore
    .collection(FirestoreCollections.Users)
    .doc(decodedToken.uid)
    .set(userPayload);

  return userPayload;
};
