import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadTypedefsSync } from '@graphql-tools/load';
import { TypeSource } from '@graphql-tools/utils';
import { ApolloServer } from 'apollo-server-micro';
import { makeExecutableSchema } from 'graphql-tools';
import { RequestHandler } from 'micro';

import { createContextHandler } from '../../lib/context';
import { cors } from '../../lib/micro';
import { prisma } from '../../lib/prisma';
import { resolvers } from '../../resolvers';

const typeDefs = loadTypedefsSync('../', {
  loaders: [new GraphQLFileLoader()],
}).filter(source => source.document) as TypeSource;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
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
  await prisma.$connect();
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(handler);
