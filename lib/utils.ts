import { User } from '@prisma/client';

import { ErrorNames } from './enums';

export function checkUserPermissionsOrThrow(user: User | null): asserts user {
  if (!user) {
    throw new Error(ErrorNames.Unauthenticated);
  }
}
