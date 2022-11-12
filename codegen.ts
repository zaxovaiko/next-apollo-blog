import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  generates: {
    'generated/graphql.ts': {
      config: {
        contextType: '../lib/context#ApolloContext',
        mappers: {
          User: '.prisma/client#User as UserType',
          Post: '.prisma/client#Post as PostType',
          Comment: '.prisma/client#Comment as CommentType',
        },
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
