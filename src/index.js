const dotenv = require("dotenv");
const { ApolloServer, gql } = require("apollo-server");

// typeDefs
const userTypeDefs = require("./typeDefs/users");
const postTypeDefs = require("./typeDefs/posts");
const commentTypeDefs = require("./typeDefs/comments");

// resolvers
const userResolver = require("./resolvers/users");
const postResolver = require("./resolvers/posts");
const commentResolver = require("./resolvers/comments");

dotenv.config();
const typeDefs = gql`
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [typeDefs, userTypeDefs, postTypeDefs, commentTypeDefs],
  resolvers: [userResolver, postResolver, commentResolver],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
