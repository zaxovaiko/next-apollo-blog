import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { createContextHandler } from 'server/lib/context';

import { createServer } from '../../server/lib/apollo';

const apolloServer = createServer();

export default startServerAndCreateNextHandler(apolloServer, {
  context: createContextHandler,
});
