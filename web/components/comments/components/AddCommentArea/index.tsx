import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Text,
  Textarea,
} from '@mantine/core';
import { IconSend } from '@tabler/icons';
import { Post } from 'generated/client';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCreateCommentForm } from 'web/components/comments/components/AddCommentArea/hooks';
import { auth } from 'web/lib/firebase';

export const AddCommentArea = ({ postId }: { postId: Post['id'] }) => {
  const [user] = useAuthState(auth);

  const { form, handleSubmit, loading } = useCreateCommentForm(postId);

  if (!user || loading) {
    return null;
  }

  return (
    <Container px={0}>
      <Card withBorder shadow="sm" radius="md" my="md">
        <Grid>
          <Grid.Col xs={1}>
            <Avatar src={user.photoURL} alt="me" radius="xl" />
          </Grid.Col>
          <Grid.Col xs={10.5} offset={0.5}>
            <form
              onSubmit={form.onSubmit(() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises -- no need to be awaited
                handleSubmit();
              })}
            >
              <Text size="sm" mb="md">
                {user.displayName}
              </Text>
              <Textarea
                placeholder="Type your comment"
                autosize
                minRows={2}
                {...form.getInputProps('text')}
              />
              <Group align="center" mt="md">
                <Text fz="sm" ml="auto">
                  {form.values.text.length}/250
                </Text>
                <Button
                  compact
                  variant="outline"
                  type="submit"
                  sx={{ float: 'right' }}
                >
                  <IconSend size={20} />
                </Button>
              </Group>
            </form>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
};
