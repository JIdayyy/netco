import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Cms from 'src/services/Cms';

const DynamicPlayer = dynamic(() => import('src/components/Player'), { ssr: false });

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function VideoPage(props: IProps) {
  return (
    <div>
      <DynamicPlayer src={props.src || 'no url'} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [video, webConfig] = await Promise.allSettled([Cms.getVideo(params.id), Cms.getConfig()]);
  return {
    props: {
      video: video.status === 'fulfilled' ? video.value : null,
      webConfig: webConfig.status === 'fulfilled' ? webConfig.value : null,
    },
  };
};
