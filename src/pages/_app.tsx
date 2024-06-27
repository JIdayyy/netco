import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import Layout from 'src/components/Layout';

import 'react-multi-carousel/lib/styles.css';
import '../styles.css';

import { AppContextProvider } from '$contexts/AppContext';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, props: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <NextNProgress color="var(--secondary)" />
          {getLayout(<Component {...pageProps} />, pageProps.webConfig)}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppContextProvider>
    </>
  );
}

export default MyApp;
