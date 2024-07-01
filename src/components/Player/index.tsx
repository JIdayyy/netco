import ReactPlayer from 'react-player';

export default function Player({
  src,
  muted,
}: Readonly<{
  src: string;
  muted: boolean;
}>) {
  return (
    <ReactPlayer
      url={src}
      playing={true}
      controls={false}
      loop={true}
      width="100%"
      height="100%"
      muted={muted}
      style={{ zIndex: 10, position: 'absolute', transform: 'scale(1.7)' }}
    />
  );
}
