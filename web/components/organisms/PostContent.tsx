import { Image, Text, Title } from '@mantine/core';
import React from 'react';

import { PostThumbnailFragment } from '../../../generated/client';
import AddCommentForm from '../molecules/AddCommentForm';
import { PostCommentsList } from './PostCommentsList';

const PostContent = ({ post }: { post: PostThumbnailFragment }) => {
  return (
    <>
      <Title order={1} fw="bold" align="left" mb="md">
        {post.title}
      </Title>
      <Image height={200} src={post.previewImage} radius="md" />
      <Text size="xl" mt={20}>
        {post.content}
      </Text>
      <AddCommentForm />
      <PostCommentsList id={post.id} />
    </>
  );
};
export default PostContent;
