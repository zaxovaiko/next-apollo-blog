import { AuthenticationError, ValidationError } from 'apollo-server-micro';
import { isNil, omitBy } from 'lodash';

import { MutationResolvers } from '../../generated/graphql';
import {
  DEFAULT_USER_AVATAR,
  ErrorNames,
  FirestoreCollections,
} from '../../lib/enums';
import { fireStore } from '../../lib/firebase';

export const updateUser: MutationResolvers['updateUser'] = async (
  _parent,
  { input },
  { user },
) => {
  if (!user) {
    throw new AuthenticationError(ErrorNames.Unauthenticated);
  }

  const { username, email, avatar } = input;
  if (username && username !== user.username) {
    const usernames = await fireStore
      .collection(FirestoreCollections.Users)
      .where('username', '==', username)
      .count()
      .get();

    if (usernames.data().count) {
      throw new ValidationError(ErrorNames.UserAlreadyExists);
    }
  }

  if (email && email !== user.email) {
    const emails = await fireStore
      .collection(FirestoreCollections.Users)
      .where('email', '==', email)
      .count()
      .get();

    if (emails.data().count) {
      throw new ValidationError(ErrorNames.UserAlreadyExists);
    }
  }

  const userPayload = {
    ...omitBy(
      {
        ...input,
        avatar: avatar === '' ? DEFAULT_USER_AVATAR : avatar,
      },
      isNil,
    ),
    updatedAt: new Date(),
  };

  await fireStore
    .collection(FirestoreCollections.Users)
    .doc(user.id)
    .update(userPayload);

  return { ...user, ...userPayload };
};
