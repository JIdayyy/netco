import { BiLike, BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { IoPlay } from 'react-icons/io5';
import { MdOutlineChat, MdOutlineHighQuality } from 'react-icons/md';
import { useRouter } from 'next/router';

import Player from '$components/Player';

export default function FakeVideoDialog({
  handleMute,
  muted,
  duration,
  views,
  name,
}: {
  handleMute: () => void;
  muted: boolean;
  duration: string;
  views: number;
  name: string;
}) {
  const router = useRouter();
  return (
    <div className={'w-full h-full'}>
      <div className={'w-full overflow-hidden h-[300px] relative'}>
        <Player
          muted={muted}
          src={'https://minio-api.jidayyy.com/yourte/Design%20sans%20titre.mp4'}
        />
        <div
          className={
            'bg-gradient-to-b absolute w-full h-full z-[998] from-transparent  to-background'
          }
        />
        <div
          className={
            'flex space-x-2 w-full justify-between items-center absolute bottom-5 px-5 tablet:px-10 z-[999]'
          }
        >
          <div className={'flex justify-center items-center align-middle space-x-2'}>
            <button
              onClick={() => router.push('/videos/1')}
              className={
                'flex bg-primary px-2 py-1 text-white space-x-2 justify-center items-center'
              }
            >
              WATCH <IoPlay size={20} />
            </button>
            <button
              className={
                'rounded-full hover:bg-white  transition-all  border-2 border-gray-500 p-1'
              }
            >
              <BiLike size={25} className={'text-white hover:text-black  transition-all'} />
            </button>
          </div>
          <button
            onClick={handleMute}
            className={'rounded-full hover:bg-white  transition-all  border-2 border-gray-500 p-1'}
          >
            {muted ? (
              <BiVolumeMute size={25} className={'text-white hover:text-black  transition-all'} />
            ) : (
              <BiVolumeFull size={25} className={'text-white hover:text-black  transition-all'} />
            )}
          </button>
        </div>
      </div>

      <div className={'w-full pointer-events-auto  space-y-4 text-white p-10'}>
        <div className={'flex justify-between items-center align-middle w-full'}>
          <div className={'flex justify-center space-x-2 align-middle items-center'}>
            <h3 className={'font-bold text-xl'}>{name}</h3>{' '}
            <MdOutlineHighQuality size={25} className={'text-gray-400'} />
            <MdOutlineChat size={20} className={'text-gray-400'} />
          </div>
          <div>
            <p className={'text-xs text-gray-400'}>Duration: {duration}</p>
            <p className={'text-xs text-gray-400'}>Views: {views}</p>
          </div>
        </div>

        <p className={'text-xs flex flex-col whitespace-pre-wrap font-normal'}>{DEFAULT_TEXT}</p>
      </div>
    </div>
  );
}

const DEFAULT_TEXT =
  'Christian Horner has given his view on the dramatic late-race collision between Max Verstappen and Lando Norris in the Austrian Grand Prix, with the Red Bull boss arguing that the 10-second penalty handed to Verstappen was “harsh”.\n' +
  '\n' +
  'Verstappen had led for much of the race before seeing his advantage over second-placed Norris cut following a rare slow pit stop from the Red Bull squad on Lap 52 of 71. A thrilling chase ensued in the laps that followed as Norris attempted several overtakes in a battle for the lead.\n' +
  '\n' +
  'It all came to a head on Lap 64 when there was contact between the pair, resulting in both picking up punctures and having to return slowly to the pits. While Norris sustained too much damage to continue, Verstappen rejoined and ended the event in fifth place.' +
  'The Dutchman did, however, receive a 10-second time penalty after being deemed at fault for the incident, but ultimately had enough of a gap to Nico Hulkenberg in sixth to hold the position.\n' +
  '\n';
