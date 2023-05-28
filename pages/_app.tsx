import { ApolloProvider } from '@apollo/client';
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  MantineProvider,
  px,
} from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { emotionCache } from 'emotionCache';
import NextApp, { type AppContext, type AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { AppHeader } from 'web/components/ui/AppHeader';
import { client } from 'web/lib/apollo';

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

  const primaryColor = colorScheme === 'dark' ? 'princessPeach' : 'magenta';

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
          emotionCache={emotionCache}
          theme={{
            colors: {
              magenta: [
                '#F8EEFD',
                '#F1DDFC',
                '#EACBF9',
                '#E3BAF7',
                '#DCA9F4',
                '#D597F1',
                '#CD85EE',
                '#C672EA',
                '#BE5DE6',
                '#B646E2',
              ],
              princessPeach: [
                '#FFF2FE',
                '#FFE4FD',
                '#FED7FC',
                '#FDC9FB',
                '#FCBBFA',
                '#FAADF8',
                '#F89EF7',
                '#F68FF5',
                '#F480F3',
                '#F16FF1',
              ],
              dolly: [
                '#FDFEF2',
                '#FCFDE6',
                '#FAFCD9',
                '#F9FACB',
                '#F7F9BE',
                '#F6F8B0',
                '#F5F6A1',
                '#F3F492',
                '#F2F381',
                '#F1F16F',
              ],
            },
            components: {
              Button: { defaultProps: { color: primaryColor } },
            },
            defaultGradient: {
              from: primaryColor,
              to: 'dolly',
              deg: 45,
            },
            colorScheme,
            fontFamily: 'Inter, sans-serif',
            primaryColor,
            globalStyles: theme => ({
              h2: {
                position: 'relative',
              },
              'h2:after': {
                background: theme.colors.dolly[9],
                bottom: 0,
                content: '""',
                display: 'block',
                height: 8,
                left: 0,
                opacity: 0.5,
                position: 'absolute',
                right: 0,
                transition: 'height 0.2s ease-in-out',
              },
              '&:hover:after': {
                height: 15,
              },
            }),
          }}
        >
          <ApolloProvider client={client}>
            <AppShell padding="md" header={<AppHeader />}>
              <Notifications position="top-right" />
              <Container
                size="sm"
                sx={{
                  minHeight: '100%',
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                <Component {...pageProps} />
              </Container>
            </AppShell>
          </ApolloProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
  };
};

export default App;
