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

  type Query {
    users: [User!]
    posts: [Post!]
  }
`;
