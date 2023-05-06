import { Box, Button, Text, Textarea, TextInput, Title } from '@mantine/core';
import React from 'react';
import { useCreatePost } from 'web/components/post/CreatePostView/hooks';

import { PageLoader } from '../../ui/PageLoader';

export function CreatePostView() {
  const { form, loading, handleSubmit } = useCreatePost();

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
      <Text>
        Your post will be visible for everyone <b>only after publishing it</b>
      </Text>
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
