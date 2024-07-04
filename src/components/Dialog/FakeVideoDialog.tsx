import { useState } from 'react';
import { BiLike, BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { IoPlay } from 'react-icons/io5';
import { MdOutlineChat, MdOutlineHighQuality } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { playlist } from '$components/constants';
import Player from '$components/Player';

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
      <motion.div className={'w-full pointer-events-auto overflow-hidden  h-[300px] relative'}>
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

        <p className={'text-xs flex flex-col whitespace-pre-wrap font-normal'}>
          {playlist[selected].text}
        </p>
      </motion.div>
    </motion.div>
  );
}
