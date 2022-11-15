import {
  ActionIcon,
  Navbar,
  Flex,
  Title,
  useMantineColorScheme,
  Button,
  Divider,
  Drawer,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import React, { useState } from 'react';

export const Sidebar = () => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const [opened, setOpened] = useState(false);

  return (
    <Navbar p="xs" width={{ base: 300 }}>
      <Navbar.Section>
        <Flex align="center" mt="lg">
          <Title order={3} align="center" sx={{ flex: 1 }}>
            Apollo-blog
          </Title>

          <ActionIcon
            ml="auto"
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Flex>
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <Divider size="xs" my="sm" />
        Content
      </Navbar.Section>
      <Navbar.Section>
        <Divider size="xs" my="sm" />
        <Flex justify="center">
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title="Register"
            padding="xl"
            size="xl"
          >
            {/* Drawer content */}
          </Drawer>
          <Button variant="outline" onClick={() => setOpened(true)}>
            Sign in
          </Button>
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
};
