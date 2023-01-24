import { Avatar, Card, Grid, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { BasicCommentFragment } from 'generated/client';
import React from 'react';

export const CommentCard = ({ comment }: { comment: BasicCommentFragment }) => {
  const {
    text,
    createdAt,
    user: { avatar, displayName },
  } = comment;
  return (
    <Card withBorder shadow="sm" radius="md" my="md">
      <Grid>
        <Grid.Col xs={1}>
          <Avatar src={avatar} alt={displayName ?? 'Image'} radius="xl" />
        </Grid.Col>
        <Grid.Col xs={10.5} offset={0.5}>
          <Text size="sm">{displayName}</Text>
          <Text size="xs" color="dimmed" mb="md">
            {dayjs(createdAt).fromNow()}
          </Text>
          <Text size="sm">{text}</Text>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
