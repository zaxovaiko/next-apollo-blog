import { handler } from '../../lib/apollo';
import { cors } from '../../lib/micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(handler);
