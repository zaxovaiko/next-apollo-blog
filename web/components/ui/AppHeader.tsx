import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  Flex,
  Header,
  Switch,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {
  IconArrowBackUp,
  IconMoonStars,
  IconSun,
  IconTextPlus,
} from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from 'web/lib/firebase';

export const AppHeader = () => {
  const [user] = useAuthState(auth);
  const { pathname, push, back: navigateBack } = useRouter();

  // TODO: Handle error and loading states
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  useEffect(() => {
    async function writeToken() {
      if (user) {
        localStorage.setItem('token', `Bearer ${await user.getIdToken()}`);
      }
    }

    writeToken().catch(console.error);
  }, [user]);

  const navigateToPostCreate = () => push('/posts/create');

  const isMainPage = pathname === '/';
  const LeftSideIcon = isMainPage ? IconTextPlus : IconArrowBackUp;

  return (
    <Header fixed height="90" sx={{ border: 0 }}>
      <Container>
        <Flex my={25} align="center">
          <Flex
            sx={{ flex: 1 }}
            direction="row"
            align="center"
            justify="flex-start"
          >
            <ActionIcon mr="md" variant="light">
              <LeftSideIcon
                onClick={isMainPage ? navigateToPostCreate : navigateBack}
                style={{ cursor: 'pointer' }}
              />
            </ActionIcon>

            <Switch
              checked={colorScheme === 'dark'}
              onChange={() => toggleColorScheme()}
              size="lg"
              onLabel={
                <IconSun color={theme.white} size="1.25rem" stroke={1.5} />
              }
              offLabel={
                <IconMoonStars
                  color={theme.colors.gray[6]}
                  size="1.25rem"
                  stroke={1.5}
                />
              }
            />
          </Flex>
          <Title
            ml="auto"
            fw="bold"
            size={32}
            variant="gradient"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises -- no need to await
            onClick={() => push('/')}
            sx={{ cursor: 'pointer', flex: 1 }}
          >
            ApolloBlog
          </Title>
          {user ? (
            <Link href={`/users/${user.uid}`} legacyBehavior>
              <Flex
                sx={{
                  cursor: 'pointer',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                }}
              >
                <Text ml="auto" mb={0}>
                  {user.displayName}
                </Text>
                <Avatar radius="xl" src={user.photoURL} alt="it's me" />
              </Flex>
            </Link>
          ) : (
            <Button
              sx={{ flex: 1 }}
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
