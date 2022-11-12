export enum NodeEnvs {
  Development = 'development',
  Production = 'production',
}

export enum FirestoreCollections {
  Users = 'users',
  Posts = 'posts',
  Comments = 'comments',
}

export enum ErrorNames {
  Unauthenticated = 'UNAUTHENTICATED',
  TokenIdRequired = 'TOKEN_ID_REQUIRED',
  SomeDataIsRequired = 'SOME_DATA_IS_REQUIRED',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
}

export const DEFAULT_USER_AVATAR =
  'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg';
