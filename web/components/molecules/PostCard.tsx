import { Avatar, Box, Card, Flex, Image, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import { PostThumbnailFragment } from '../../../generated/client';

const PostCard = ({ post }: { post: PostThumbnailFragment }) => {
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
              transition: 'transform .2s',
              zIndex: 2,
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.6)',
              },
            }}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
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

export default PostCard;
