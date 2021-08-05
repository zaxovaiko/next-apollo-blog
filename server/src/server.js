const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server");
const { parseUserFromToken } = require("./helpers/auth-token.helper");

// Import modules
const user = require("./user");
const post = require("./post");
const comment = require("./comment");

dotenv.config();
const typeDefs = gql`
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [typeDefs, user.schema, post.schema, comment.schema],
  resolvers: [user.resolver, post.resolver, comment.resolver],
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    try {
      const user = parseUserFromToken(token);
      return { user: await user.service.getOneById(user.id) };
    } catch (e) {
      return { user: null };
    }
  },
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => server.listen())
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => console.error(err));
