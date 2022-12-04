import { Grid } from '@mantine/core';
import React from 'react';

import { PostThumbnailFragment } from '../../../generated/client';
import PostCard from './PostCard';

const PostsList = ({ posts = [] }: { posts: PostThumbnailFragment[] }) => {
  return (
    <Grid>
      {posts.map(post => (
        <Grid.Col key={post.id} span={12} mb="md">
          <PostCard post={post} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default PostsList;
