import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { Post, PostThumbnailFragment } from 'generated/client';
import { useRouter } from 'next/router';
import React, { memo } from 'react';

type Props = {
  post: PostThumbnailFragment;
  onDelete: (id: Post['id']) => Promise<void>;
};

export const PostCard = memo(({ post, onDelete }: Props) => {
  const { push } = useRouter();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {post.previewImage && (
        <Card.Section mb="md">
          <Image src={post.previewImage} height={160} alt={post.title} />
        </Card.Section>
      )}

      <Group position="apart" mb="xs">
        <Flex sx={{ flex: 1 }} align="center" justify="space-between">
          <Title order={2} fw="bold" weight={500}>
            {post.title}
          </Title>
          <IconTrash
            onClick={() => {
              onDelete(post.id).catch(console.error);
            }}
            style={{
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          />
        </Flex>
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
});

PostCard.displayName = 'PostCard';
