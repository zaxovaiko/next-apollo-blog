import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Text,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus, IconSend } from '@tabler/icons';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'web/lib/firebase';

export const AddCommentArea = () => {
  const [user] = useAuthState(auth);
  const [isFormOpen, setForm] = useState(false);

  const form = useForm({
    initialValues: { text: '' },

    validate: {
      text: value =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
    },
  });

  const handleSubmit = () => {
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
        <IconPlus size={18} />
      </ActionIcon>
      <Divider />

      {isFormOpen && (
        <Card withBorder shadow="sm" radius="md" my="md">
          <Grid>
            <Grid.Col xs={1}>
              <Avatar src={user.photoURL} alt="me" radius="xl" />
            </Grid.Col>
            <Grid.Col xs={10.5} offset={0.5}>
              <Text size="sm" mb="md">
                {user.displayName}
              </Text>
              <form onSubmit={form.onSubmit(() => handleSubmit())}>
                <Textarea
                  placeholder="Type your comment"
                  autosize
                  minRows={2}
                  {...form.getInputProps('text')}
                />
                <Button
                  compact
                  variant="outline"
                  color="teal"
                  mt="md"
                  type="submit"
                  sx={{ float: 'right' }}
                >
                  <IconSend size={20} />
                </Button>
              </form>
            </Grid.Col>
          </Grid>
        </Card>
      )}
    </Container>
  );
};
