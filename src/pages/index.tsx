import { ReactElement } from 'react';
import { KenticoPageLayoutDTO } from '@origins-digital/types/ott';
import { WebConfig } from '@origins-digital/types/web-experience';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Cms from 'src/services/Cms';

import Layout from '$components/Layout';
import { componentRenderer } from '$utils/components';
import { DEFAULT_LANGUAGE, KENTICO_HARDCODED_PAGES } from '$utils/constants';

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

function Home({ page }: Readonly<IProps>): JSX.Element | null {
  if (!page) {
    return null;
  }

  return (
    <div className={'flex flex-col space-y-8 items-center'}>
      {page.components.map((component) => componentRenderer(component))}
    </div>
  );
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const pageLocale = locale ?? DEFAULT_LANGUAGE;
  const [page] = await Promise.allSettled([
    Cms.getPageContent<KenticoPageLayoutDTO>(KENTICO_HARDCODED_PAGES.HOME, {
      params: {
        language: pageLocale,
      },
    }),
  ]);

  return {
    props: {
      page: page.status === 'fulfilled' ? page.value : null,
    },
  };
};

Home.getLayout = function getLayout(page: ReactElement, config: WebConfig) {
  return <Layout config={config}>{page}</Layout>;
};

export default Home;
