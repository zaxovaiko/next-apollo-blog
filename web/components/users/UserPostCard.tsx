import { Button, Card, Group, Image, Text } from '@mantine/core';
import { PostThumbnailFragment } from 'generated/client';
import { useRouter } from 'next/router';
import React from 'react';

export const UserPostCard = ({ post }: { post: PostThumbnailFragment }) => {
  const { push } = useRouter();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {post.previewImage && (
        <Card.Section mb="md">
          <Image src={post.previewImage} height={160} alt={post.title} />
        </Card.Section>
      )}

      <Group position="apart" mb="xs">
        <Text weight={500}>{post.title}</Text>
      </Group>

      <Text size="sm" color="dimmed" truncate>
        {post.content}
      </Text>

      <Button
        onClick={() => {
          push(`/posts/${post.id}`).catch(console.error);
        }}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        Read more
      </Button>
    </Card>
  );
};
