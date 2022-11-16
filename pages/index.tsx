import { Grid } from '@mantine/core';
import type { NextPage } from 'next';
import React from 'react';

import { useGetPostsQuery } from '../generated/client';
import PostCardLoader from '../web/components/PostCardLoader';
import PostsList from '../web/components/PostsList';

const Home: NextPage = () => {
  const { data, loading, error } = useGetPostsQuery();

  if (loading) {
    return (
      <Grid>
        Loading
        {Array.from({ length: 3 }).map((_, i) => (
          <Grid.Col key={i} span={6} offset={3}>
            <PostCardLoader />
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <PostsList posts={data?.posts} />;
};

export default Home;
