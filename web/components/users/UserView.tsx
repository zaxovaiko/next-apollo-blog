import { Grid } from '@mantine/core';
import { useGetUserWithPostsQuery } from 'generated/client';
import { useRouter } from 'next/router';
import React from 'react';
import { PageLoader } from 'web/components/ui/PageLoader';
import { UserPostCard } from 'web/components/users/UserPostCard';

export const UserView = () => {
  const { query } = useRouter();
  const { uid } = query as { uid: string };

  const { data, loading, error } = useGetUserWithPostsQuery({
    variables: {
      input: { uid },
      postsInput: { first: 20 },
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <PageLoader />;
  }

  if (error || !data?.user) {
    return <div>{error?.message ?? 'Something went wrong...'}</div>;
  }

  const posts = data.user.posts.edges.map(edge => edge.node) ?? [];

  return (
    <div>
      <h1>{data.user.displayName}</h1>
      <Grid>
        {posts.map(post => (
          <Grid.Col span={6} key={post.id}>
            <UserPostCard post={post} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};
