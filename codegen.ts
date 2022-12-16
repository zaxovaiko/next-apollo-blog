import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '**/*.graphql',
  generates: {
    'generated/server.ts': {
      config: {
        contextType: '../server/lib/context#ApolloContext',
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
    'generated/client.ts': {
      documents: './web/graphql/**/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
