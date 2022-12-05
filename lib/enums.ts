export enum NodeEnvs {
  Development = 'development',
  Production = 'production',
}

export enum ErrorNames {
  Unauthenticated = 'UNAUTHENTICATED',
  TokenIdRequired = 'TOKEN_ID_REQUIRED',
  SomeDataIsRequired = 'SOME_DATA_IS_REQUIRED',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  PostTitleIsRequired = 'POST_TITLE_IS_REQUIRED',
  InvalidCommentLength = 'INVALID_COMMENT_LENGTH',
  CanNotCreateCommentOnDraftPost = 'CAN_NOT_CREATE_COMMENT_ON_DRAFT_POST',
}

export const DEFAULT_USER_AVATAR =
  'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg';
