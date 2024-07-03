import { useState } from 'react';
import { BiLike, BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { IoPlay } from 'react-icons/io5';
import { MdOutlineChat, MdOutlineHighQuality } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import Player from '$components/Player';

const playlist = [
  {
    name: 'Christian Horner',
    duration: '1:30',
    views: 100,
    text: "In a heated aftermath of the Austrian Grand Prix, Christian Horner defended Max Verstappen after his late-race collision with Lando Norris, labeling the 10-second penalty as “harsh.” Verstappen had been dominating the race until a rare slow pit stop on Lap 52 allowed Norris to close in. This set the stage for a thrilling duel between the two. On Lap 64, the tension peaked as contact between their cars caused punctures for both, forcing them to pit. Norris's car suffered extensive damage and he had to retire, while Verstappen managed to continue and finished fifth. Despite the penalty, he maintained a significant gap over Nico Hulkenberg, securing his position.",
  },
  {
    name: 'Grand Prix Italie',
    duration: '1:30',
    views: 100,
    text: 'Christian Horner has spoken out about the dramatic clash between Max Verstappen and Lando Norris during the Austrian Grand Prix, describing the 10-second penalty given to Verstappen as “harsh.” Verstappen had been leading comfortably until a slow pit stop on Lap 52 cut his lead. This allowed Norris to mount a challenge, leading to several intense overtaking attempts. The conflict reached its climax on Lap 64 with contact that resulted in punctures for both drivers. While Norris’s car was too damaged to continue, Verstappen was able to rejoin the race and finished in fifth place. Despite the penalty, he stayed ahead of Nico Hulkenberg, retaining his position.',
  },
  {
    name: 'Austrian Grand Prix',
    duration: '1:30',
    views: 100,
    text: 'Christian Horner has spoken out about the dramatic clash between Max Verstappen and Lando Norris during the Austrian Grand Prix, describing the 10-second penalty given to Verstappen as “harsh.” Verstappen had been leading comfortably until a slow pit stop on Lap 52 cut his lead. This allowed Norris to mount a challenge, leading to several intense overtaking attempts. The conflict reached its climax on Lap 64 with contact that resulted in punctures for both drivers. While Norris’s car was too damaged to continue, Verstappen was able to rejoin the race and finished in fifth place. Despite the penalty, he stayed ahead of Nico Hulkenberg, retaining his position.',
  },
];

export default function FakeVideoDialog() {
  const [muted, setMuted] = useState(false);

  const [selected, setSelected] = useState(0);
  const router = useRouter();

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
      exit={{
        opacity: 0,
      }}
      key={selected}
      className={'w-full h-full'}
    >
      <motion.div className={'w-full pointer-events-auto overflow-hidden h-[300px] relative'}>
        <div className={'w-full space-x-2 flex absolute top-2 justify-center my-2'}>
          <button
            className={
              'z-[9999]  transition-all hover:bg-primary rounded-full border-2 border-slate-600 p-2 text-white  top-0'
            }
            onClick={() => {
              setSelected(selected - 1 < 0 ? playlist.length - 1 : selected - 1);
            }}
          >
            <FaArrowLeft size={15} />
          </button>
          <button
            className={
              'z-[9999]  transition-all hover:bg-primary rounded-full border-2 border-slate-600 p-2 text-white  top-0'
            }
            onClick={() => {
              setSelected(selected + 1 > playlist.length - 1 ? 0 : selected + 1);
            }}
          >
            <FaArrowRight size={15} />
          </button>
        </div>
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
            onClick={() => {
              setMuted(!muted);
            }}
            className={'rounded-full hover:bg-white  transition-all  border-2 border-gray-500 p-1'}
          >
            {muted ? (
              <BiVolumeMute size={25} className={'text-white hover:text-black  transition-all'} />
            ) : (
              <BiVolumeFull size={25} className={'text-white hover:text-black  transition-all'} />
            )}
          </button>
        </div>
      </motion.div>

      <motion.div className={'w-full pointer-events-auto  space-y-4 text-white p-5 tablet:p-10'}>
        <div className={'flex justify-between items-center align-middle w-full'}>
          <div className={'flex justify-center space-x-2 align-middle items-center'}>
            <h3 className={'font-bold text-xl'}>{playlist[selected].name}</h3>{' '}
            <MdOutlineHighQuality size={25} className={'text-gray-400'} />
            <MdOutlineChat size={20} className={'text-gray-400'} />
          </div>
          <div>
            <p className={'text-xs text-gray-400'}>Duration: {playlist[selected].duration}</p>
            <p className={'text-xs text-gray-400'}>Views: {playlist[selected].views}</p>
          </div>
        </div>

        <p className={'text-xs flex flex-col whitespace-pre-wrap font-normal'}>{DEFAULT_TEXT}</p>
      </motion.div>
    </motion.div>
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
