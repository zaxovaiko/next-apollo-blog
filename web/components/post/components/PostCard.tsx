import { Avatar, Box, Card, Flex, Image, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { PostThumbnailFragment } from 'generated/client';
import { useRouter } from 'next/router';
import React from 'react';

export const PostCard = ({ post }: { post: PostThumbnailFragment }) => {
  const router = useRouter();
  return (
    <Box sx={{ position: 'relative' }}>
      <Card shadow="sm" radius="md">
        <Card.Section>
          <Image src={post.previewImage} height={300} alt="Post image" />
          <Flex
            align="center"
            mt="sm"
            pos="absolute"
            sx={{
              background: 'rgba(0, 0, 0, 0.5)',
              width: '100%',
              padding: 20,
              bottom: 0,
              cursor: 'pointer',
              zIndex: 2,
            }}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises -- no need to await
            onClick={() => router.push(`/posts/${post.id}`)}
          >
            <Avatar h={60} w={60} src={post.user.avatar} radius="xl" mr="sm" />
            <Box>
              <Text fw="bold" size="lg" color="white">
                {post.title}
              </Text>
              <Text size="xs" color="gray.2">
                {post.user.username}
              </Text>
            </Box>
            <Text ml="auto" size="xs" color="gray.2">
              {dayjs(post.createdAt as Date).fromNow()}
            </Text>
          </Flex>
        </Card.Section>
      </Card>
    </Box>
  );
};
