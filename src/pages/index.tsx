import { ReactElement } from 'react';
import { KenticoPageLayoutDTO } from '@origins-digital/types/ott';
import { WebConfig } from '@origins-digital/types/web-experience';
import { InferGetStaticPropsType } from 'next';
import Cms from 'src/services/Cms';

import Layout from '$components/Layout';
import { componentRenderer } from '$utils/components';
import { KENTICO_HARDCODED_PAGES } from '$utils/constants';

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

function Home({ page }: Readonly<IProps>): JSX.Element | null {
  if (!page) {
    return null;
  }

  return (
    <div className={'flex flex-col  items-center'}>
      {page.components.map((component) => componentRenderer(component))}
    </div>
  );
}

export const getStaticProps = async () => {
  const [page] = await Promise.allSettled([
    Cms.getPageContent<KenticoPageLayoutDTO>(KENTICO_HARDCODED_PAGES.HOME, {
      params: {
        language: 'fr',
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
