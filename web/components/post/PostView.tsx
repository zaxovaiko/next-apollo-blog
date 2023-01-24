import { Grid, Text, Title, Image } from '@mantine/core';
import { useGetPostQuery } from 'generated/client';
import { useRouter } from 'next/router';
import React from 'react';
import { AddCommentArea } from 'web/components/comments/components/AddCommentArea';
import { PostCommentsList } from 'web/components/post/PostCommentsList';
import { PostAuthorCard } from 'web/components/post/components/PostAuthorCard';
import { PageLoader } from 'web/components/ui/PageLoader';

export const PostView = () => {
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

  const post = data.post;

  return (
    <Grid>
      <Grid.Col xs={9}>
        <Title order={1} fw="bold" align="left" mb="md">
          {post.title}
        </Title>
        <Image height={200} src={post.previewImage ?? ''} radius="md" />
        <Text size="xl" mt={20}>
          {post.content}
        </Text>
        <AddCommentArea postId={id as string} />
        <PostCommentsList id={post.id} />
      </Grid.Col>
      <Grid.Col xs={3}>
        <PostAuthorCard user={data.post.user} />
      </Grid.Col>
    </Grid>
  );
};
