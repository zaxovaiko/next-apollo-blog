import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';

export const createContextHandler = (
  req: MicroRequest,
  res: ServerResponse,
) => {
  console.log(req, res);
  return {};
};
