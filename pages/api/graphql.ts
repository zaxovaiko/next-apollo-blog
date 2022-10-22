import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';

import { resolvers } from '../../resolvers';
import { typeDefs } from '../../typeDefs';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
const startServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD',
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
