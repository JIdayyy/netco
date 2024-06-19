import { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { OriginsVideoCard } from '@origins-digital/types/ott';
import Image from 'next/image';

import { IMG_PLACEHOLDER } from '$utils/constants';

function VideoCard(props: Readonly<OriginsVideoCard>) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={
        'rounded-md  border border-gray-700 ease-in cursor-pointer aspect-video   relative overflow-hidden'
      }
    >
      <div className={'w-full z-[50] absolute top-0 bg-blue-500 h-[10px]'}></div>

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
        layout="fill"
        src={props.poster || IMG_PLACEHOLDER}
        alt={props.name}
      />
      <div
        className={
          'absolute w-full h-full  bg-gradient-to-b from-transparent via-transparent to-black z-30'
        }
      ></div>
      {isHover && (
        <div
          className={
            'absolute w-full flex flex-col justify-center items-center align-middle bg-opacity-50 transition-all bg-transparent hover:bg-blue-600 hover:bg-opacity-40 ease-in-out duration-500 h-full z-40'
          }
        >
          <FaLock color={'white'} size={50} />
          <p className={'text-white text-xs'}>Sign in to unlock</p>
        </div>
      )}
    </div>
  );
}

export default VideoCard;
