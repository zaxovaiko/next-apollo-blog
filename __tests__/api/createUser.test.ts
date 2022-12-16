import { createServer, startServer, stopServer } from '../../server/lib/apollo';

const server = createServer();

beforeAll(() => startServer(server));
beforeEach(() => null);
afterAll(() => stopServer(server));

describe('Create user action', () => {
  it.skip('should create a new user', () => {
    // TODO: Add test
  });
});
