import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Cms from 'src/services/Cms';

import Layout from '$components/Layout';

const DynamicPlayer = dynamic(() => import('src/components/Player'), { ssr: false });

/*
type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;
*/

export default function VideoPage() {
  return (
    <div>
      <DynamicPlayer
        src={
          'https://dev-origins-archive-video.onrewind.tv/vod/outputs/r1x-ei_zq/19c29d86-c898-45db-b0bc-fe7d8faadb9e_1699964876962/19c29d86-c898-45db-b0bc-fe7d8faadb9e_OR-Ott_Hls_Ts_Avc_Aac_16x9_1920x1080p_30Hz_5Mbps_00003.ts'
        }
      />
    </div>
  );
}

VideoPage.getLayout = function getLayout(page: ReactElement, config: any) {
  return <Layout config={config}>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [video] = await Promise.allSettled([Cms.getVideo(params?.id as string)]);
  return {
    props: {
      video: video.status === 'fulfilled' ? video.value : null,
    },
  };
};
