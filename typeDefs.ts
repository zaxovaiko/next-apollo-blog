import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar Date

  type User {
    avatar: String!
    createdAt: Date
    firstName: String
    id: ID!
    inactive: Boolean!
    lastName: String
    updatedAt: Date
    username: String!
    posts: [Post!]
    comments: [Comment!]
  }

  type Post {
    content: String
    createdAt: Date
    comments: [Comment!]
    id: ID!
    isDraft: Boolean
    title: String!
    updatedAt: Date
    previewImage: String
    images: [String!]
    upvotes: Int!
    user: User!
  }

  type Comment {
    createdAt: Date
    id: ID!
    post: Post!
    text: String!
    updatedAt: Date
    upvotes: Int
    user: User!
  }

  input CreateUserInput {
    username: String!
  }

  input UpdateUserInput {
    username: String!
    firstName: String
    lastName: String
    avatar: String
  }

  input CreatePostInput {
    title: String!
    content: String
    previewImage: String
    images: [String!]
  }

  input UpdatePostInput {
    id: ID!
  }

  input PublishPostInput {
    id: ID!
  }

  input DeletePostInput {
    id: ID!
  }

  input CreateCommentInput {
    text: String!
  }

  input UpdateCommentInput {
    id: ID!
    text: String!
  }

  input DeleteCommentInput {
    id: ID!
  }

  type Query {
    users: [User!]
    posts: [Post!]
    comments: [Comment!]
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser: User

    createPost(input: CreatePostInput!): Post
    updatePost(input: UpdatePostInput!): Post
    publishPost(input: PublishPostInput!): Post
    deletePost(input: DeletePostInput!): Post

    createComment(input: CreateCommentInput!): Comment
    updateComment(input: UpdateCommentInput!): Comment
    deleteComment(input: DeleteCommentInput!): Comment
  }
`;
