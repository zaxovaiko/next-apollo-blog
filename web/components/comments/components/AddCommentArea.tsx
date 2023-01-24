import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Text,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus, IconSend, IconX } from '@tabler/icons';
import { Post } from 'generated/client';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { commentsService } from 'web/components/comments/comments.service';
import { auth } from 'web/lib/firebase';

export const AddCommentArea = ({ postId }: { postId: Post['id'] }) => {
  const [user] = useAuthState(auth);
  const { handleCreateComment } = commentsService.useCreateComment();

  const [isFormOpen, setForm] = useState(false);

  const form = useForm({
    initialValues: { text: '' },

    validate: {
      text: value => {
        if (value.length > 250) {
          return 'Comment is too long';
        }
        if (value.length < 1) {
          return 'Comment is too short';
        }
        return null;
      },
    },
  });

  const handleSubmit = async () => {
    await handleCreateComment({
      text: form.values.text,
      postId,
    });

    setForm(false);
    form.reset();
  };

  if (!user) {
    return null;
  }

  return (
    <Container px={0}>
      <ActionIcon
        variant="outline"
        my="sm"
        sx={{ marginRight: '0', marginLeft: 'auto' }}
        onClick={() => {
          setForm(p => !p);
          form.reset();
        }}
      >
        {!isFormOpen ? <IconPlus size={18} /> : <IconX size={18} />}
      </ActionIcon>
      <Divider />

      {isFormOpen && (
        <Card withBorder shadow="sm" radius="md" my="md">
          <Grid>
            <Grid.Col xs={1}>
              <Avatar src={user.photoURL} alt="me" radius="xl" />
            </Grid.Col>
            <Grid.Col xs={10.5} offset={0.5}>
              <form
                onSubmit={form.onSubmit(() => {
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises -- onSubmit is async
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
                    color="teal"
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
      )}
    </Container>
  );
};
