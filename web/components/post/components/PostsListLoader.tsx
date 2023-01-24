import { Grid } from '@mantine/core';
import dynamic from 'next/dynamic';
import React, { memo } from 'react';
import PostCardLoader from 'web/components/post/components/PostCardLoader';

const PostsListLoader = ({ rows }: { rows: number }) => (
  <Grid role="alert">
    {Array.from({ length: rows }).map((_, i) => (
      <Grid.Col key={i} span={12} mb="md">
        <PostCardLoader />
      </Grid.Col>
    ))}
  </Grid>
);

export default dynamic(() => Promise.resolve(memo(PostsListLoader)), {
  ssr: false,
});
