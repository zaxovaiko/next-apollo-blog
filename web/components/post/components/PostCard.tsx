import { Avatar, Box, Card, Flex, Image, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { PostThumbnailFragment } from 'generated/client';
import Link from 'next/link';
import React from 'react';

export const PostCard = ({ post }: { post: PostThumbnailFragment }) => {
  const hasImage = post.previewImage !== null;

  return (
    <Box sx={{ position: 'relative' }}>
      <Card shadow="sm" radius="md">
        {hasImage && (
          <Card.Section mb="md">
            <Image src={post.previewImage} height={160} alt={post.title} />
          </Card.Section>
        )}
        <Flex sx={{ alignItems: 'center' }}>
          <Link href={`/users/${post.user.uid}`} passHref legacyBehavior>
            <Flex style={{ cursor: 'pointer', alignItems: 'center' }}>
              <Avatar
                src={post.user.avatar}
                alt={post.user.displayName ?? 'User avatar'}
                radius="xl"
                mr="sm"
              />
              <Text size="sm" fw="bold" color="dark.3">
                {post.user.displayName}
              </Text>
            </Flex>
          </Link>
          <Text ml="auto" size="xs" color="dimmed">
            {dayjs(post.createdAt as Date).fromNow()}
          </Text>
        </Flex>

        <Link passHref legacyBehavior href={`/posts/${post.id}`}>
          <Title order={2} mt="sm" display="inline-block">
            {post.title}
          </Title>
        </Link>
        <Text lineClamp={2} mt="sm" size="sm" color="dimmed">
          {post.content}
        </Text>
      </Card>
    </Box>
  );
};
