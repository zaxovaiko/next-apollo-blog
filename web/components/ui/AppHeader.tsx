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
import { IconArrowBackUp, IconMoonStars, IconSun } from '@tabler/icons';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from 'web/lib/firebase';

export const AppHeader = () => {
  const [user] = useAuthState(auth);
  const { pathname, push, back } = useRouter();

  // TODO: Handle error and loading states
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const dark = colorScheme === 'dark';

  useEffect(() => {
    async function writeToken() {
      if (user) {
        localStorage.setItem('token', `Bearer ${await user.getIdToken()}`);
      }
    }

    writeToken().catch(console.error);
  }, [user]);

  return (
    <Header fixed height="90">
      <Container size="sm">
        <Flex my={25} align="center">
          <Flex
            sx={{ flex: 1 }}
            direction="row"
            align="center"
            justify="flex-start"
          >
            {pathname !== '/' && (
              <ActionIcon mr="md" variant="light">
                <IconArrowBackUp
                  onClick={() => back()}
                  style={{
                    cursor: 'pointer',
                  }}
                />
              </ActionIcon>
            )}
            <ActionIcon
              sx={{ alignSelf: 'center' }}
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
          </Flex>
          <Title
            ml="auto"
            fw="bold"
            size={32}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises -- no need to await
            onClick={() => push('/')}
            sx={{ cursor: 'pointer', flex: 1 }}
          >
            ApolloBlog
          </Title>
          {user ? (
            <Text ml="auto" mb={0}>
              {user.displayName}
            </Text>
          ) : (
            <Button
              sx={{
                flex: 1,
              }}
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
