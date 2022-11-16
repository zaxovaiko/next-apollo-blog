import { Flex, Skeleton } from '@mantine/core';
import dynamic from 'next/dynamic';
import React from 'react';

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

const PostCardLoader = () => (
  <>
    <Flex align="center" mb="md">
      <Flex align="center" sx={{ flex: 1 }}>
        <Skeleton height={50} circle />
        <Skeleton
          height={18}
          ml="md"
          mt={6}
          width={`${random(4, 9)}0%`}
          radius="xl"
        />
      </Flex>
      <Skeleton height={8} mt={6} ml="auto" width="10%" radius="xl" />
    </Flex>
    {Array.from({ length: Math.floor(Math.random() * 6) + 2 }).map((_, i) => (
      <Skeleton key={i} height={12} mt={6} width="100%" radius="xl" />
    ))}
    <Skeleton height={12} mt={6} width={`${random(4, 9)}0%`} radius="xl" />
  </>
);

export default dynamic(() => Promise.resolve(PostCardLoader), {
  ssr: false,
});
