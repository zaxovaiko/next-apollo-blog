import { Box, Button, Text, Textarea, TextInput, Title } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { useCreatePostMutation } from 'generated/client';
import { useRouter } from 'next/router';
import React from 'react';

import { PageLoader } from '../ui/PageLoader';

export function CreatePostView() {
  const router = useRouter();

  const [createPost, { loading }] = useCreatePostMutation();

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
    },

    validate: {
      title: hasLength(
        { min: 2, max: 32 },
        'Title must be 2-32 characters long',
      ),
      content: hasLength(
        { max: 1000 },
        'Content can not be longer than 1000 characters',
      ),
    },
  });

  const handleSubmit = async () => {
    const { data, errors } = await createPost({
      variables: {
        input: {
          title: form.values.title,
          content: form.values.content,
        },
      },
    });

    if (data) {
      await router.push('/');

      notifications.show({
        title: 'Success',
        message: 'Post created successfully',
        icon: <IconCheck />,
        withCloseButton: true,
        radius: 'xl',
        color: 'green',
      });
      return;
    }

    if (errors) {
      notifications.show({
        title: 'Error',
        message: errors[0].message,
        withCloseButton: true,
        radius: 'xl',
        color: 'red',
      });
      return;
    }

    return;
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
      }}
      component="form"
      onSubmit={form.onSubmit(() => handleSubmit() as unknown as void)}
    >
      <Title>Create a post</Title>
      <Text>Your post will be visible for everyone</Text>
      <TextInput {...form.getInputProps('title')} mt="xl" placeholder="Title" />
      <Textarea
        {...form.getInputProps('content')}
        my="md"
        placeholder="Your content"
        minRows={4}
        autosize
      />

      <Button type="submit" variant="light" sx={{ marginLeft: 'auto' }}>
        Post a message
      </Button>
    </Box>
  );
}
