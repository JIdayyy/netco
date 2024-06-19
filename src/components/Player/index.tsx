import { useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';

export default function Player({ src }: { src: string }) {
  const playerRef = useRef(null);
  return (
    <ReactHlsPlayer
      className={'z-0'}
      playerRef={playerRef}
      src={src}
      autoPlay={true}
      controls={false}
      width="100%"
      height="auto"
      muted={true}
    />
  );
}
