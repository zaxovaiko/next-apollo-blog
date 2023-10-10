import { ContextFunction } from '@apollo/server';
import { User } from '@prisma/client';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { NextApiRequest, NextApiResponse } from 'next';

import { fireAuth } from './firebase';
import { prisma } from '../prisma';

export type ApolloContext = {
  decodedToken: DecodedIdToken | null;
  user: User | null;
};

export const createContextHandler: ContextFunction<
  [NextApiRequest, NextApiResponse<unknown>],
  ApolloContext
> = async req => {
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

      return { decodedToken, user };
    } catch {
      return { decodedToken: null, user: null };
    }
  }
  return { decodedToken: null, user: null };
};
