import { MicroRequest } from 'apollo-server-micro/dist/types';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { User } from '../generated/graphql';
import { fireAuth, fireStore } from './firebase';

export type ApolloContext = {
  decodedToken: DecodedIdToken | null;
  user: User | null;
};

export const createContextHandler = async ({
  req,
}: {
  req: MicroRequest;
}): Promise<ApolloContext> => {
  const [, token] = req.headers.authorization?.split('Bearer ') ?? [];
  if (token) {
    try {
      const decodedToken = await fireAuth.verifyIdToken(token);
      const userDoc = await fireStore
        .collection('users')
        .doc(decodedToken.uid)
        .get();

      return {
        decodedToken,
        user: (userDoc.data() as User) ?? null,
      };
    } catch {
      return {
        decodedToken: null,
        user: null,
      };
    }
  }
  return {
    decodedToken: null,
    user: null,
  };
};
