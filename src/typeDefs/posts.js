const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    text: String!
    user: User
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    posts: [Post!]
    post(id: ID!): Post
  }

  extend type Mutation {
    createPost(text: String!, userId: ID!): Post
    editPost(id: ID!, text: String!): Post
    deletePost(id: ID!): Post
  }
`;
