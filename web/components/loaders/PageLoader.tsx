import {
  LoadingOverlay,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';

export const PageLoader = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <LoadingOverlay
      visible
      overlayBlur={1}
      loaderProps={{
        color:
          colorScheme === 'dark' ? theme.colors.gray[1] : theme.colors.dark[1],
      }}
    />
  );
};
