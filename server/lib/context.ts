import { User } from '@prisma/client';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { prisma } from '../prisma';
import { fireAuth } from './firebase';

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

      const user = await prisma.user.upsert({
        where: { uid: decodedToken.uid },
        update: {},
        create: {
          uid: decodedToken.uid,
          displayName: decodedToken.name as string,
          avatar: decodedToken.picture,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return {
        decodedToken,
        user,
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
