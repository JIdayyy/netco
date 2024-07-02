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
import FakeVideoDialog from '$components/Dialog/FakeVideoDialog';
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
      items: 1,
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
        itemClass={'tablet:mr-6 mr-2'}
        className={'px-2 py-8'}
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
          <FakeVideoDialog
            handleMute={handleMute}
            muted={muted}
            duration={'00:00'}
            views={0}
            name={props.name}
          />
        </Dialog>
      )}
      <div className={'w-full z-[50] absolute top-0 bg-slate-500 h-[10px]'}></div>
      <div
        className={
          'absolute top-0 left-0 w-full p-2 h-full flex flex-col justify-end flex-end text-white z-40'
        }
      >
        <div>
          <h3 className={'font-bold text-xs tablet:text-sm'}>{props.name}</h3>
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
  const [isHovered, setIsHovered] = useState(false);

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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      className={`rounded-md border border-gray-700  cursor-pointer ${
        props.format === 'portrait' ? 'aspect-portrait' : 'aspect-video'
      } aspect-video  hover:shadow-zinc-800 hover:z-[9999]  relative overflow-hidden`}
    >
      {isDialogOpen && (
        <Dialog handleDialogClose={handleDialogClose}>
          <FakeVideoDialog
            handleMute={handleMute}
            muted={muted}
            duration={'00:00'}
            views={0}
            name={props.name}
          />
        </Dialog>
      )}
      <div className={'w-full z-[50] absolute top-0 bg-slate-500 h-[10px]'}></div>

      <div
        className={'w-full p-2 h-full flex flex-col justify-end items-end flex-end text-white z-40'}
      >
        <div className={'w-full z-50 flex flex-col items-start align-middle justify-between'}>
          <h3 className={' text-xs tablet:text-sm line-clamp-1 whitespace-nowrap'}>{props.name}</h3>
          <p className={'text-xs text-gray-200 '}>{props.duration}</p>
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
