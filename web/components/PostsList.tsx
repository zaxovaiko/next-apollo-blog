import { Avatar, Box, Card, Flex, Grid, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

import { GetPostsQuery } from '../../generated/client';

const PostsList = ({ posts = [] }: { posts: GetPostsQuery['posts'] }) => {
  return (
    <Grid>
      {posts?.map(post => (
        <Grid.Col key={post.id} offset={3} span={6}>
          <Card shadow="sm" radius="md">
            <Flex align="center" mb="sm">
              <Avatar src={post.user.avatar} radius="xl" mr="sm" />
              <Box>
                <Title order={4}>{post.title}</Title>
                <Text size="xs" variant="gradient">
                  {post.user.username}
                </Text>
              </Box>
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

export default PostsList;
