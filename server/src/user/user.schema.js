const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String!
    password: String!
    roles: [String!]!
    posts: [Post!]!
    comments: [Comment!]!
    likedPosts: [Post!]!
    likedComments: [Comment!]!
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User
    login(email: String!, password: String!): String
  }

  extend type Mutation {
    signup(name: String!, email: String!, password: String!): String
    editUser(id: ID!, name: String!, email: String!, password: String!): User
    deleteUser(id: ID!): User
  }
`;
