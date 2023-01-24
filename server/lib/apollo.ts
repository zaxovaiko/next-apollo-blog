import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadTypedefsSync } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { TypeSource } from '@graphql-tools/utils';
import { ApolloServer } from 'apollo-server-micro';
import { DateTimeTypeDefinition, DateTimeResolver } from 'graphql-scalars';

import { resolvers } from '../resolvers';
import { createContextHandler } from './context';
import { NodeEnvs } from './enums';
import { prisma } from './prisma';

const typeDefs = loadTypedefsSync('./schema.graphql', {
  loaders: [new GraphQLFileLoader()],
}).map(e => e.document) as TypeSource[];

const schema = makeExecutableSchema({
  typeDefs: [...typeDefs, DateTimeTypeDefinition],
  resolvers: {
    ...resolvers,
    DateTime: DateTimeResolver,
  },
});

export const createServer = () =>
  new ApolloServer({
    schema,
    cache: 'bounded',
    introspection: process.env.NODE_ENV === NodeEnvs.Development,
    context: createContextHandler,
  });

export const startServer = async (server: ApolloServer) => {
  await server.start();
  await prisma.$connect();
};

export const stopServer = async (server: ApolloServer) => {
  await server.stop();
  await prisma.$disconnect();
};
