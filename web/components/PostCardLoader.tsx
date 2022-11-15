import { Skeleton } from '@mantine/core';
import dynamic from 'next/dynamic';
import React from 'react';

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

const Component = () => {
  return (
    <>
      <Skeleton height={18} mt={6} width={`${random(4, 9)}0%`} radius="xl" />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} height={12} mt={6} width="100%" radius="xl" />
      ))}
      <Skeleton height={12} mt={6} width={`${random(4, 9)}0%`} radius="xl" />
    </>
  );
};

const PostCardLoader = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});

export default PostCardLoader;
