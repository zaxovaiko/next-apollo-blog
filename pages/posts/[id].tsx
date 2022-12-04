import { Divider, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

import { useGetPostQuery } from '../../generated/client';
import { PostCommentsList } from '../../web/components/comments/PostCommentsList';
import { PageLoader } from '../../web/components/loaders/PageLoader';
import PostCard from '../../web/components/posts/PostCard';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useGetPostQuery({
    variables: { input: { id: id as string } },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  if (loading) {
    return <PageLoader />;
  }

  if (error || !data?.post) {
    return <div>{error?.message ?? 'Something went wrong...'}</div>;
  }

  return (
    <>
      <PostCard post={data.post} />
      <Text size="xl" mt={20}>
        {data.post.content}
      </Text>
      <Divider my="xl" />

      <PostCommentsList id={id as string} />
    </>
  );
};

export default PostPage;
