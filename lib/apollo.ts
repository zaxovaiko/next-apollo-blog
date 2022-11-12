import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadTypedefsSync } from '@graphql-tools/load';
import { TypeSource } from '@graphql-tools/utils';
import { ApolloServer } from 'apollo-server-micro';
import { makeExecutableSchema } from 'graphql-tools';
import { RequestHandler } from 'micro';

import { resolvers } from '../resolvers';
import { createContextHandler } from './context';
import { NodeEnvs } from './enums';
import { prisma } from './prisma';

const typeDefs = loadTypedefsSync('../', {
  loaders: [new GraphQLFileLoader()],
}).filter(source => source.document) as TypeSource;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const apolloServer = new ApolloServer({
  schema,
  cache: 'bounded',
  introspection: process.env.NODE_ENV === NodeEnvs.Development,
  context: createContextHandler,
});
const startServer = apolloServer.start();

export const handler: RequestHandler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await startServer;
  await prisma.$connect();
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};
