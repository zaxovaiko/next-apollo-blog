import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Header,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import React from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth } from '../../lib/firebase';

const AppHeader = () => {
  const [userg] = useAuthState(auth);

  // TODO: Handle error and loading states
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);

  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Header fixed height="90">
      <Container size="sm">
        <Flex my={25} justify="space-between">
          <ActionIcon
            sx={{ alignSelf: 'center' }}
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
          <Title order={2} mb={0}>
            ApolloBlog
          </Title>
          {userg || user ? (
            <Text mb={0}>{userg?.displayName || user?.user.displayName}</Text>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
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

export default AppHeader;
