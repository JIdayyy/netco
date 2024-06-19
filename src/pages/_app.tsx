import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { WebConfig } from '@origins-digital/types/web-experience';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import { ViewportProvider } from '@onrewind/ui';

import '../styles.css';

import Layout from '$components/layout';
import { AppContextProvider } from '$contexts/AppContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const webConfig: WebConfig = pageProps.webConfig;

  return (
    <>
      {/* <DefaultSeo title={webConfig.SEO.title} description={webConfig.SEO.description} />*/}

      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <ViewportProvider>
            <NextNProgress color="var(--secondary)" />
            <Layout config={webConfig}>
              <Component {...pageProps} />
            </Layout>
          </ViewportProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppContextProvider>
    </>
  );
}

export default MyApp;
