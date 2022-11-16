import { Grid } from '@mantine/core';
import React from 'react';

import { GetPostsQuery, Post } from '../../../generated/client';
import PostCard from './PostCard';

const PostsList = ({ posts = [] }: { posts: GetPostsQuery['posts'] }) => {
  return (
    <Grid>
      {posts?.map(post => (
        <Grid.Col key={post.id} offset={3} span={6} mb="md">
          <PostCard post={post as Post} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default PostsList;
