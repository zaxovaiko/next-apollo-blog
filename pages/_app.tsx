import { ApolloProvider } from '@apollo/client';
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { Sidebar } from '../web/components/layouts/Sidebar';
import { client } from '../web/lib/apollo';

dayjs.extend(relativeTime);

const App = ({ Component, pageProps }: AppProps) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>Apollo-blog</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <ApolloProvider client={client}>
            <AppShell padding="md" navbar={<Sidebar />}>
              <Component {...pageProps} />
            </AppShell>
          </ApolloProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
