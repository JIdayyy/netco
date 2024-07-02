import { useState } from 'react';
import { BiLike, BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { IoPlay } from 'react-icons/io5';
import { MdOutlineChat, MdOutlineHighQuality } from 'react-icons/md';
import MultiCarousel, { ResponsiveType } from 'react-multi-carousel';
import {
  OriginsPlaylistCard,
  OriginsVideoCard,
  SectionDynamicCarousel,
} from '@origins-digital/types/ott';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Dialog from '$components/Dialog';
import Player from '$components/Player';
import Button from '$components/UI/Button';
import { IMG_PLACEHOLDER } from '$utils/constants';

const getResponsive = (format: string): ResponsiveType => {
  return {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: format !== 'portrait' ? 6 : 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: format !== 'portrait' ? 4 : 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
    },
  };
};

export default function DynamicCarousel(props: Readonly<SectionDynamicCarousel>) {
  return (
    <div className={'w-full max-w-7xl'}>
      <h2 className={'font-bold px-8 transform translate-y-4 uppercase text-white'}>
        {props.name}
      </h2>
      <MultiCarousel
        centerMode={true}
        itemClass={'mr-6'}
        className={'tablet:px-5 desktop:px-10 px-2 py-8'}
        responsive={getResponsive(props.format)}
      >
        {props.Videos
          ? [...props.Videos, ...props.Videos].map((item) => {
              switch (item.itemType) {
                case 'video':
                  return <VideoCard format={props.format} key={item.itemId} {...item} />;
              }
            })
          : [...props.Playlists, ...props.Playlists].map((item) => {
              switch (item.itemType) {
                case 'playlist':
                  return <PlaylistCard format={props.format} key={item.itemId} {...item} />;
              }
            })}
      </MultiCarousel>
    </div>
  );
}

function PlaylistCard(
  props: Readonly<
    OriginsPlaylistCard & {
      format: 'portrait' | 'landscape';
    }
  >,
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleMute = () => {
    setMuted((state) => !state);
  };

  return (
    <motion.div
      onClick={handleDialogOpen}
      whileHover={{ scale: 1.05 }}
      initial={{ scale: 0.9, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`rounded-md border border-gray-700  cursor-pointer  ${
        props.format === 'portrait' ? 'aspect-portrait' : 'aspect-video'
      }  relative overflow-hidden`}
    >
      {isDialogOpen && (
        <Dialog handleDialogClose={handleDialogClose}>
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
                  'flex space-x-2 w-full justify-between items-center absolute bottom-5 px-10 z-[999]'
                }
              >
                <div className={'flex justify-center items-center align-middle space-x-2'}>
                  <Button
                    className={'flex justify-center items-center'}
                    size={'md'}
                    variant={'primary'}
                  >
                    WATCH <IoPlay size={20} />
                  </Button>
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
                  className={
                    'rounded-full hover:bg-white  transition-all  border-2 border-gray-500 p-1'
                  }
                >
                  {muted ? (
                    <BiVolumeMute
                      size={25}
                      className={'text-white hover:text-black  transition-all'}
                    />
                  ) : (
                    <BiVolumeFull
                      size={25}
                      className={'text-white hover:text-black  transition-all'}
                    />
                  )}
                </button>
              </div>
            </div>

            <div className={'w-full pointer-events-auto  space-y-4 text-white p-10'}>
              <div className={'flex justify-between items-center align-middle w-full'}>
                <div className={'flex justify-center space-x-2 align-middle items-center'}>
                  <h3 className={'font-bold text-xl'}>{props.name}</h3>{' '}
                  <MdOutlineHighQuality size={25} className={'text-gray-400'} />
                  <MdOutlineChat size={20} className={'text-gray-400'} />
                </div>
              </div>

              <p className={'text-xs flex flex-col whitespace-pre-wrap font-thin'}>
                {DEFAULT_TEXT}
              </p>
            </div>
          </div>
        </Dialog>
      )}
      <div className={'w-full z-[50] absolute top-0 bg-slate-500 h-[10px]'}></div>
      <div
        className={
          'absolute top-0 left-0 w-full p-2 h-full flex flex-col justify-end flex-end text-white z-40'
        }
      >
        <div>
          <h3 className={'font-bold text-sm tablet:text-base'}>{props.name}</h3>
        </div>
      </div>
      <Image
        layout={'fill'}
        className={'object-cover'}
        src={props.thumbnail || IMG_PLACEHOLDER}
        alt={props.name}
      />
      <div
        className={
          'absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-black z-30'
        }
      ></div>
    </motion.div>
  );
}

function VideoCard(
  props: Readonly<
    OriginsVideoCard & {
      format: 'portrait' | 'landscape';
    }
  >,
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleMute = () => {
    setMuted((state) => !state);
  };

  return (
    <motion.div
      onClick={handleDialogOpen}
      whileHover={{ scale: 1.05 }}
      className={`rounded-md border border-gray-700  cursor-pointer ${
        props.format === 'portrait' ? 'aspect-portrait' : 'aspect-video'
      } aspect-video  hover:shadow-zinc-800 hover:z-[9999]  relative overflow-hidden`}
    >
      {isDialogOpen && (
        <Dialog handleDialogClose={handleDialogClose}>
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
                  'flex space-x-2 w-full justify-between items-center absolute bottom-5 px-10 z-[999]'
                }
              >
                <div className={'flex justify-center items-center align-middle space-x-2'}>
                  <Button
                    className={'flex justify-center items-center'}
                    size={'md'}
                    variant={'primary'}
                  >
                    WATCH <IoPlay size={20} />
                  </Button>
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
                  className={
                    'rounded-full hover:bg-white  transition-all  border-2 border-gray-500 p-1'
                  }
                >
                  {muted ? (
                    <BiVolumeMute
                      size={25}
                      className={'text-white hover:text-black  transition-all'}
                    />
                  ) : (
                    <BiVolumeFull
                      size={25}
                      className={'text-white hover:text-black  transition-all'}
                    />
                  )}
                </button>
              </div>
            </div>

            <div className={'w-full pointer-events-auto  space-y-4 text-white p-10'}>
              <div className={'flex justify-between items-center align-middle w-full'}>
                <div className={'flex justify-center space-x-2 align-middle items-center'}>
                  <h3 className={'font-bold text-sm tablet:text-base'}>{props.name}</h3>{' '}
                  <MdOutlineHighQuality size={25} className={'text-gray-400'} />
                  <MdOutlineChat size={20} className={'text-gray-400'} />
                </div>
                <div>
                  <p className={'text-xs text-gray-400'}>Duration: {props.duration}</p>
                </div>
              </div>

              <p className={'text-xs flex flex-col whitespace-pre-wrap font-thin'}>
                {DEFAULT_TEXT}
              </p>
            </div>
          </div>
        </Dialog>
      )}
      <div className={'w-full z-[50] absolute top-0 bg-slate-500 h-[10px]'}></div>

      <div
        className={
          'absolute top-0 left-0 w-full p-2 h-full flex flex-col justify-end items-end flex-end text-white z-40'
        }
      >
        <div className={'w-full flex items-center align-middle justify-between'}>
          <h3 className={' text-sm tablet:text-base'}>{props.name}</h3>
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
