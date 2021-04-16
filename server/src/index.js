const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server");
const UserService = require("./services/UserService");

// typeDefs
const userTypeDefs = require("./typeDefs/users");
const postTypeDefs = require("./typeDefs/posts");
const commentTypeDefs = require("./typeDefs/comments");

// resolvers
const userResolver = require("./resolvers/users");
const postResolver = require("./resolvers/posts");
const commentResolver = require("./resolvers/comments");
const { parseUserFromToken } = require("./helpers/authToken");

dotenv.config();
const typeDefs = gql`
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [typeDefs, userTypeDefs, postTypeDefs, commentTypeDefs],
  resolvers: [userResolver, postResolver, commentResolver],
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    try {
      const user = parseUserFromToken(token);
      return { user: await UserService.getOneById(user.id) };
    } catch (e) {
      return { user: null };
    }
  },
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => server.listen())
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => console.error(err));
