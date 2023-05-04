import { ActionIcon, Avatar, Card, Grid, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons';
import dayjs from 'dayjs';
import {
  type BasicCommentFragment,
  GetPostCommentsDocument,
  useDeleteCommentMutation,
} from 'generated/client';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { client } from 'web/lib/apollo';
import { auth } from 'web/lib/firebase';

export const CommentCard = ({ comment }: { comment: BasicCommentFragment }) => {
  const [user] = useAuthState(auth);

  const [deleteComment, { loading }] = useDeleteCommentMutation();

  const { text, createdAt } = comment;
  const { uid: authorUid, avatar, displayName } = comment.user;

  const currentUserCanDelete = authorUid === user?.uid;

  const handleDeleteClick = () => {
    deleteComment({
      variables: { input: { id: comment.id } },
      update: () => {
        client
          .refetchQueries({
            include: [GetPostCommentsDocument],
          })
          .catch(console.error);
      },
    })
      .then(({ data, errors }) => {
        if (errors) {
          notifications.show({
            title: 'Default notification',
            message: 'Hey there, your code is awesome! 🤥',
            color: 'red',
          });
          return;
        }

        if (data?.deleteComment) {
          notifications.show({
            title: 'Comment was deleted',
            message: 'Your comment was deleted successfully',
            color: 'green',
          });
        }
      })
      .catch(console.error);
  };

  if (!user) {
    return null;
  }

  return (
    <Card withBorder shadow="sm" radius="md" my="md">
      <Grid>
        <Grid.Col xs={1}>
          <Avatar src={avatar} alt={displayName ?? 'Image'} radius="xl" />
        </Grid.Col>
        <Grid.Col xs={9.5} offset={0.5}>
          <Text size="sm">{displayName}</Text>
          <Text size="xs" color="dimmed" mb="md">
            {dayjs(createdAt).fromNow()}
          </Text>
          <Text size="sm">{text}</Text>
        </Grid.Col>
        {currentUserCanDelete && (
          <Grid.Col xs={0.5}>
            <ActionIcon
              variant="light"
              loading={loading}
              onClick={handleDeleteClick}
            >
              <IconTrash size="1.05rem" />
            </ActionIcon>
          </Grid.Col>
        )}
      </Grid>
    </Card>
  );
};
