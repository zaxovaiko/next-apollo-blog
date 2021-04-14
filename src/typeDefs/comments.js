const { gql } = require("apollo-server");

module.exports = gql`
  type Comment {
    id: ID!
    text: String!
    user: User
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    comments: [Comment!]
    comment(id: ID!): Comment
  }

  extend type Mutation {
    createComment(text: String!, userId: ID!): Comment
    updateComment(id: ID!, text: String!): Comment
    deleteComment(id: ID!): Comment
  }
`;
