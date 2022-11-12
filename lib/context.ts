import { User } from '@prisma/client';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { fireAuth } from './firebase';
import { prisma } from './prisma';

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

      const user = await prisma.user.findFirst({
        where: { uid: decodedToken.uid },
      });

      return {
        decodedToken,
        user: user ?? null,
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
