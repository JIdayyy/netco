import { useQuery } from 'react-query';
import { KenticoPageLayoutDTO } from '@origins-digital/types/ott';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Cms from 'src/services/Cms';

import { componentRenderer } from '$utils/components';
import { DEFAULT_LANGUAGE, KENTICO_HARDCODED_PAGES } from '$utils/constants';

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

function Home({ page, webConfig }: IProps): JSX.Element | null {
  const { data } = useQuery('home-page', () => void 0, {
    initialData: page,
  });
  useQuery('web-config', () => void 0, {
    initialData: webConfig,
  });

  if (!data) {
    return null;
  }

  return (
    <div className={'flex flex-col space-y-8 items-center'}>
      {data.components.map((component) => componentRenderer(component))}
    </div>
  );
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const pageLocale = locale ?? DEFAULT_LANGUAGE;
  const [page, webConfig] = await Promise.allSettled([
    Cms.getPageContent<KenticoPageLayoutDTO>(KENTICO_HARDCODED_PAGES.HOME, {
      params: {
        language: pageLocale,
      },
    }),
    Cms.getConfig(),
  ]);

  return {
    props: {
      page: page.status === 'fulfilled' ? page.value : null,
      webConfig: webConfig.status === 'fulfilled' ? webConfig.value : null,
    },
  };
};

export default Home;
