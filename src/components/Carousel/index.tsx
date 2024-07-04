import { useState } from 'react';
import MultiCarousel, { ResponsiveType } from 'react-multi-carousel';
import { OriginsPlaylistCard, OriginsVideoCard } from '@origins-digital/types/ott';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Dialog from '$components/Dialog';
import FakeVideoDialog from '$components/Dialog/FakeVideoDialog';
import { IMG_PLACEHOLDER } from '$utils/constants';

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    paritialVisibilityGutter: 30,
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    paritialVisibilityGutter: 30,
    items: 4,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    paritialVisibilityGutter: 30,
    items: 2,
  },
};

export default function Carousel(
  props: Readonly<{
    name: string;
    items: (OriginsPlaylistCard | OriginsVideoCard)[];
  }>,
) {
  return (
    <div className={'w-full max-w-7xl'}>
      <h2 className={'font-bold px-8 uppercase text-white'}>{props.name}</h2>
      <MultiCarousel itemClass={'mr-6'} className={' px-2 py-8'} responsive={responsive}>
        {props.items.map((item: any) => {
          switch (item.itemType) {
            case 'video':
              return <VideoCard key={item.itemId} {...item} />;
            case 'playlist':
              return <PlaylistCard key={item.itemId} {...item} />;
            case 'category':
              return <CategoryCard key={item.itemId} {...item} />;
          }
        })}
      </MultiCarousel>
    </div>
  );
}

function VideoCard(props: Readonly<OriginsVideoCard>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      whileHover={{ scale: 1.05 }}
      className={
        'rounded-md border border-gray-700  cursor-pointer aspect-video  hover:shadow-zinc-800 hover:z-[9999]  relative overflow-hidden'
      }
    >
      {isDialogOpen && (
        <Dialog handleDialogClose={handleDialogClose}>
          <FakeVideoDialog />
        </Dialog>
      )}
      <div className={'w-full z-[50]  absolute top-0 bg-slate-500 h-[10px]'}></div>

      <div
        className={
          'absolute top-0 left-0 w-full p-2 h-full flex flex-col justify-end items-end flex-end text-white z-40'
        }
      >
        <div className={'w-full flex items-center align-middle justify-between'}>
          <h3 className={'font-bold text-md'}>{props.name}</h3>
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

function CategoryCard(props: Readonly<OriginsVideoCard>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      whileHover={{ scale: 1.05 }}
      className={
        'rounded-md border border-gray-700  cursor-pointer aspect-portrait  hover:shadow-zinc-800 hover:z-[9999]  relative overflow-hidden'
      }
    >
      {isDialogOpen && (
        <Dialog handleDialogClose={handleDialogClose}>
          <FakeVideoDialog />
        </Dialog>
      )}
      <div className={'w-full z-[50] absolute top-0 bg-slate-500 h-[10px]'} />

      <div
        className={
          'absolute top-0 left-0 w-full p-2 h-full flex flex-col justify-end items-end flex-end text-white z-40'
        }
      >
        <div className={'w-full flex items-center align-middle justify-between'}>
          <h3 className={'font-bold text-md'}>{props.name}</h3>
          <p className={'text-xs'}>{props.duration}</p>
        </div>
      </div>
      <Image
        className={'z-10 object-cover'}
        layout={'fill'}
        src={(props as any).thumbnail ?? IMG_PLACEHOLDER}
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

function PlaylistCard(props: Readonly<OriginsPlaylistCard>) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ scale: 0.9, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      className={
        'rounded-md border border-gray-700  cursor-pointer  aspect-video  relative overflow-hidden'
      }
    >
      <div className={'w-full z-[50] absolute top-0 bg-slate-500 h-[10px]'}></div>
      <div
        className={
          'absolute top-0 left-0 w-full p-2 h-full flex flex-col justify-end flex-end text-white z-40'
        }
      >
        <div>
          <h3 className={'font-bold'}>{props.name}</h3>
        </div>
      </div>
      <Image
        layout={'fill'}
        className={''}
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
