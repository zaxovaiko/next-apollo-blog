import { gql } from '@apollo/client';
import {
  BasicCommentFragment,
  useCreateCommentMutation,
  CreateCommentInput,
} from 'generated/client';

const useCreateComment = () => {
  const [createComment, data] = useCreateCommentMutation();

  const handleCreateComment = async (input: CreateCommentInput) => {
    await createComment({
      variables: {
        input,
      },
      optimisticResponse: {
        createComment: {
          id: 'temp-id',
        },
      },
      update: (cache, { data }) => {
        if (!data?.createComment) {
          return;
        }

        cache.modify({
          id: cache.identify({
            __typename: 'Post',
            id: input.postId,
          }),
          fields: {
            comments(existingComments = []) {
              if (!data.createComment) {
                return existingComments as BasicCommentFragment[];
              }

              const newCommentRef = cache.writeFragment({
                id: `Comment:${data.createComment.id}`,
                data: {
                  ...data.createComment,
                  __typename: 'Comment',
                  text: input.text,
                  createdAt: new Date(),
                  user: {
                    __typename: 'User',
                    id: '1',
                    displayName: 'John Doe',
                    avatar: 'https://i.pravatar.cc/150?img=1',
                  },
                },
                fragment: gql`
                  fragment NewComment on Comment {
                    id
                    text
                    createdAt
                    user {
                      id
                      avatar
                      displayName
                    }
                  }
                `,
              });

              return [
                newCommentRef,
                ...(existingComments as BasicCommentFragment[]),
              ];
            },
          },
        });
      },
    });
  };

  return {
    handleCreateComment,
    data,
  };
};

export const commentsService = {
  useCreateComment,
};
