import { Skeleton } from '@mantine/core';
import React from 'react';

const PostCardLoader = () => {
  return (
    <>
      <Skeleton height={18} mt={6} width="80%" radius="xl" />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} height={12} mt={6} width="100%" radius="xl" />
      ))}
      <Skeleton height={12} mt={6} width="70%" radius="xl" />
    </>
  );
};

export default PostCardLoader;
