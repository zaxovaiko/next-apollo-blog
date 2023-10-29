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
import { useCurrentUser } from 'web/shared/hooks/useCurrentUser';

type Props = {
  post: PostThumbnailFragment;
  onDelete: (id: Post['id']) => Promise<void>;
};

export const PostCard = memo(({ post, onDelete }: Props) => {
  const { push } = useRouter();
  const currentUser = useCurrentUser();
  const isAuthor = currentUser?.id === post.user.id;

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
          {isAuthor && (
            <IconTrash
              onClick={() => {
                onDelete(post.id).catch(console.error);
              }}
              style={{ cursor: 'pointer', marginLeft: 'auto' }}
            />
          )}
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
