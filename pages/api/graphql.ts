import { ApolloServer } from 'apollo-server-micro';
import { RequestHandler } from 'micro';

import { createContextHandler } from '../../lib/context';
import { cors } from '../../lib/micro';
import { resolvers } from '../../resolvers';
import { typeDefs } from '../../typeDefs';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  cache: 'bounded',
  introspection: true,
  context: createContextHandler,
});
const startServer = apolloServer.start();

const handler: RequestHandler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(handler);
