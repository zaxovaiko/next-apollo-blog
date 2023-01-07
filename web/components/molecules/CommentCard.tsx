import { Avatar, Card, Grid, Text } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

type CommentProps = {
  comment: {
    text: string;
    createdAt?: string;
    user: {
      avatar: string;
      username: string;
    };
  };
};
const CommentCard = ({ comment }: CommentProps) => {
  const {
    text,
    createdAt,
    user: { avatar, username },
  } = comment;
  return (
    <Card withBorder shadow="sm" radius="md" my="md">
      <Grid>
        <Grid.Col xs={1}>
          <Avatar src={avatar} alt={username} radius="xl" />
        </Grid.Col>
        <Grid.Col xs={10.5} offset={0.5}>
          <Text size="sm">{username}</Text>
          <Text size="xs" color="dimmed" mb="md">
            {dayjs(createdAt as unknown as Date).fromNow()}
          </Text>
          <Text size="sm">{text}</Text>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default CommentCard;
