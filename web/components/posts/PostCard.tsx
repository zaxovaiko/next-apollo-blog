import { Avatar, Box, Card, Flex, Image, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import dayjs from 'dayjs';
import React from 'react';

import { PostThumbnailFragment } from '../../../generated/client';

const PostCard = ({ post }: { post: PostThumbnailFragment }) => {
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
              zIndex: 2,
            }}
          >
            <Avatar h={60} w={60} src={post.user.avatar} radius="xl" mr="sm" />
            <Box>
              <Text fw="bold" size="lg">
                <NextLink
                  href={`/posts/${post.id}`}
                  legacyBehavior
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                  }}
                >
                  {post.title}
                </NextLink>
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
