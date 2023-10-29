import { Grid } from '@mantine/core';
import {
  GetUserWithPostsDocument,
  Post,
  useDeletePostMutation,
  useGetUserWithPostsQuery,
} from 'generated/client';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { PostCard } from 'web/pages/Profile/PostCard';

export const Profile = () => {
  const { query } = useRouter();
  const { uid } = query as { uid: string };

  const [deletePost] = useDeletePostMutation();
  const onDelete = useCallback(
    async (id: Post['id']) => {
      await deletePost({
        variables: { input: { id } },
        refetchQueries: [GetUserWithPostsDocument],
      });
    },
    [deletePost],
  );

  const { data } = useGetUserWithPostsQuery({
    variables: {
      input: { uid },
      postsInput: { first: 20 },
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
  });

  const posts = useMemo(
    () => data?.user?.posts.edges.map(edge => edge.node) ?? [],
    [data],
  );

  return (
    <div>
      <h1>{data?.user?.displayName}</h1>
      <Grid>
        {posts.map(post => (
          <Grid.Col span={6} key={post.id}>
            <PostCard onDelete={onDelete} post={post} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};
