import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Header, InitConfig } from '@origins-digital/types/ott';
import { NextPage } from 'next';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import Cms from '../services/Cms';

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

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, props: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  config: InitConfig<Header>;
};

type AppOwnProps = { config: InitConfig<Header> };

function MyApp(props: AppPropsWithLayout): JSX.Element {
  const getLayout = props.Component.getLayout ?? ((page) => page);
  return (
    <>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <NextNProgress color="var(--secondary)" />
          {getLayout(<props.Component {...props.pageProps} />, props.config)}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppContextProvider>
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async (context: AppContext): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);
  const webConfig = await Cms.getConfig();

  return { ...ctx, config: webConfig };
};
