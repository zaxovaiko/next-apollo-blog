import { RequestHandler } from 'micro';

import { createServer, startServer } from '../../lib/apollo';
import { cors } from '../../lib/micro';

const apolloServer = createServer();

export const handler: RequestHandler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await startServer(apolloServer);
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(handler);
