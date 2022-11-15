import { Card, Flex, Grid, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import type { NextPage } from 'next';
import React from 'react';

import { useGetPostsQuery } from '../generated/client';
import PostCardLoader from '../web/components/PostCardLoader';

const Home: NextPage = () => {
  const { data, loading, error } = useGetPostsQuery();

  if (loading) {
    return (
      <Grid>
        <Grid.Col span={6} offset={3}>
          <PostCardLoader />
        </Grid.Col>
      </Grid>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Grid>
      {data?.posts?.map(post => (
        <Grid.Col offset={3} span={6} key={post.id}>
          <Card shadow="sm" radius="md">
            <Flex align="center">
              <Title order={3}>{post.title}</Title>
              <Text ml="auto" size="xs">
                {dayjs(post.createdAt as Date).fromNow()}
              </Text>
            </Flex>
            <Text size="sm" color="dimmed">
              {post.content}
            </Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default Home;
