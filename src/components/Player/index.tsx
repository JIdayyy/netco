import ReactPlayer from 'react-player';

export default function Player({
  src,
  poster,
  muted,
}: {
  src: string;
  poster: string;
  muted: boolean;
}) {
  return (
    <ReactPlayer
      className="react-player"
      poster={poster}
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
