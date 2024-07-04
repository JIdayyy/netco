import { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Dialog from '$components/Dialog';
import FakeVideoDialog from '$components/Dialog/FakeVideoDialog';
import { useAppContext } from '$contexts/AppContext';
import { IMG_PLACEHOLDER } from '$utils/constants';

function VideoCard(
  props: Readonly<{
    name: string;
    duration: string | null;
    poster?: string | null;
  }>,
) {
  const [isHover, setIsHover] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isAuth } = useAppContext();

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <motion.div
      onClick={() => {
        if (!isDialogOpen) {
          handleDialogOpen();
        }
      }}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={
        'rounded-md transform border border-gray-700 ease-in cursor-pointer aspect-video   relative overflow-hidden'
      }
    >
      {isDialogOpen && isAuth && (
        <Dialog handleDialogClose={() => handleDialogClose()}>
          <FakeVideoDialog />
        </Dialog>
      )}
      <div className={'w-full z-[50] absolute top-0 bg-slate-500 h-[10px]'}></div>

      <div
        className={
          'absolute top-0 left-0 w-full p-2 h-full flex flex-col justify-end items-end flex-end text-white z-40'
        }
      >
        <div className={'w-full flex items-center align-middle justify-between'}>
          <div className={'flex flex-col'}>
            <h3 className={'font-bold text-md'}>{props.name}</h3>
          </div>
          <p className={'text-xs'}>{props.duration}</p>
        </div>
      </div>
      <Image
        className={'z-10 object-cover'}
        layout={'fill'}
        src={props.poster || IMG_PLACEHOLDER}
        alt={props.name}
      />
      <div
        className={
          'absolute w-full h-full  bg-gradient-to-b from-transparent via-transparent to-black z-30'
        }
      ></div>
      {isHover && !isAuth && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
          transition={{ duration: 0.3, delay: 0 }}
          className={
            'absolute w-full flex flex-col justify-center items-center align-middle bg-opacity-50  bg-transparent   h-full z-40'
          }
        >
          <FaLock color={'white'} size={50} />
          <p className={'text-white text-xs'}>Sign in to unlock</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default VideoCard;
