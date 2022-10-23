import { Button, Group } from '@mantine/core';
import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {
  return (
    <Group mt={50} position="center">
      <Button size="xl">Mantine is successfully initalized</Button>
    </Group>
  );
};

export default Home;
