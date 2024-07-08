import { ReactElement } from 'react';
import ReactPlayer from 'react-player';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Cms from 'src/services/Cms';

import Layout from '$components/Layout';

export default function VideoPage({
  video,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={'w-full min-h-screen'}>
      <ReactPlayer
        url={'https://minio-api.jidayyy.com/yourte/Design%20sans%20titre.mp4'}
        playing={false}
        controls={true}
        loop={true}
        width="100%"
        height="100%"
        muted={false}
      />

      <div>
        <h1 className={'font-title text-white'}>{video?.title}</h1>
        <p className={''}>{video?.description}</p>
      </div>
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
