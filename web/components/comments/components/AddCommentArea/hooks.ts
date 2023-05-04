import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  CreateCommentInput,
  GetPostCommentsDocument,
  Post,
  useCreateCommentMutation,
} from 'generated/client';
import { useState } from 'react';
import { client } from 'web/lib/apollo';

export const useCreateComment = () => {
  const [createComment, { loading }] = useCreateCommentMutation();

  const handleCreateComment = async (input: CreateCommentInput) => {
    return createComment({
      variables: { input },
      update: () => {
        client
          .refetchQueries({ include: [GetPostCommentsDocument] })
          .catch(console.error);
      },
    });
  };

  return {
    handleCreateComment,
    loading,
  };
};

export const useCreateCommentForm = (postId: Post['id']) => {
  const { handleCreateComment, loading } = useCreateComment();

  const [isFormOpen, setForm] = useState(false);

  const form = useForm({
    initialValues: { text: '' },

    validate: {
      text: value => {
        if (value.length > 250) {
          return 'Comment is too long';
        }
        if (value.length < 1) {
          return 'Comment is too short';
        }
        return null;
      },
    },
  });

  const handleSubmit = async () => {
    const { data, errors } = await handleCreateComment({
      text: form.values.text,
      postId,
    });

    if (errors) {
      notifications.show({
        message: errors[0].message,
        color: 'red',
      });
      return;
    }

    if (data?.createComment?.id) {
      notifications.show({
        message: 'Comment was created',
        color: 'green',
      });
    }

    setForm(false);
    form.reset();
  };

  return {
    form,
    handleSubmit,
    isFormOpen,
    loading,
    setForm,
  };
};
