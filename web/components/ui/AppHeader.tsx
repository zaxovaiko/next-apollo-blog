import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Group,
  Header,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth } from '../../lib/firebase';
import { ReturnButton } from './ReturnButton';

export const AppHeader = () => {
  const [user] = useAuthState(auth);
  const { pathname, push } = useRouter();

  // TODO: Handle error and loading states
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const dark = colorScheme === 'dark';

  return (
    <Header fixed height="90">
      <Container size="sm">
        <Flex my={25} justify="space-between" align="center">
          <Group>
            {pathname !== '/' && <ReturnButton />}
            <ActionIcon
              sx={{ alignSelf: 'center' }}
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
          </Group>
          <Title
            fw="bold"
            size={32}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises -- no need to await
            onClick={() => push('/')}
            sx={{ cursor: 'pointer' }}
          >
            ApolloBlog
          </Title>
          {user ? (
            <Text mb={0}>{user.displayName}</Text>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises -- no need to await
                signInWithGoogle();
              }}
            >
              Sign in with Google
            </Button>
          )}
        </Flex>
      </Container>
    </Header>
  );
};
