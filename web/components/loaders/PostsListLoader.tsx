import { Grid } from '@mantine/core';
import dynamic from 'next/dynamic';
import React, { memo } from 'react';

import PostCardLoader from './PostCardLoader';

const PostsListLoader = () => (
  <Grid role="alert">
    {Array.from({ length: Math.floor(Math.random() * 6) + 2 }).map((_, i) => (
      <Grid.Col key={i} span={12} mb="md">
        <PostCardLoader />
      </Grid.Col>
    ))}
  </Grid>
);

export default dynamic(() => Promise.resolve(memo(PostsListLoader)), {
  ssr: false,
});
