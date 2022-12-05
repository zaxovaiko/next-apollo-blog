import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Header,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import React from 'react';

const AppHeader = () => {
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
          <Box>
            <Button variant="outline">Sign in with Google</Button>
          </Box>
        </Flex>
      </Container>
    </Header>
  );
};

export default AppHeader;
