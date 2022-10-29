import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './typeDefs.ts',
  generates: {
    'generated/graphql.ts': {
      config: {
        contextType: '../lib/context#ApolloContext',
      },
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-document-nodes',
      ],
    },
  },
};

export default config;
