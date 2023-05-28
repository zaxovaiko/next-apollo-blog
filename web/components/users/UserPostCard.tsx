import { Badge, Button, Card, Group, Image, Text, Title } from '@mantine/core';
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
        <Title order={2} fw="bold" weight={500}>
          {post.title}
        </Title>
        {post.isDraft && <Badge variant="gradient">Draft</Badge>}
      </Group>

      <Text size="sm" color="dimmed" lineClamp={3}>
        {post.content}
      </Text>

      <Button
        onClick={() => {
          push(`/posts/${post.id}`).catch(console.error);
        }}
        variant="light"
        fullWidth
        mt="md"
        radius="md"
      >
        Read more
      </Button>
    </Card>
  );
};
