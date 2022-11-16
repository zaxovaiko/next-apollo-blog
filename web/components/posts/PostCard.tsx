import { Avatar, Box, Card, Flex, Image, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import dayjs from 'dayjs';
import React from 'react';

import { Post } from '../../../generated/client';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card shadow="sm" radius="md">
      <Card.Section>
        <Image src={post.previewImage} height={260} alt="Post image" />
      </Card.Section>

      <Flex align="center" mb="sm" mt="sm">
        <Avatar src={post.user.avatar} radius="xl" mr="sm" />
        <Box>
          <NextLink href={`/posts/${post.id}`} passHref legacyBehavior>
            <Text fw="bold" size="lg">
              {post.title}
            </Text>
          </NextLink>
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
  );
};

export default PostCard;
