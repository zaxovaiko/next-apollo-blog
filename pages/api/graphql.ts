import { RequestHandler } from 'micro';

import { createServer } from '../../lib/apollo';
import { cors } from '../../lib/micro';
import { prisma } from '../../lib/prisma';

const apolloServer = createServer();
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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(handler);
