import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import Cms from 'src/services/Cms';

import Layout from '$components/Layout';
import Player from '$components/Player';

export default function VideoPage() {
  return (
    <div>
      <Player
        muted={false}
        poster={''}
        src={'https://minio-api.jidayyy.com/yourte/Design%20sans%20titre.mp4'}
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
