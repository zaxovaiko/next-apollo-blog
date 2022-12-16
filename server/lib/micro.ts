import microCors from 'micro-cors';

export const cors = microCors({
  origin: 'https://studio.apollographql.com',
  allowCredentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: [
    'access-control-allow-credentials',
    'access-control-allow-origin',
    'content-type',
    'authorization',
    '*',
  ],
});
