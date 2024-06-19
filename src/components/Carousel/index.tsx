import MultiCarousel, { ResponsiveType } from 'react-multi-carousel';
import {
  CarouselSectionDTO,
  OriginsPlaylistCard,
  OriginsVideoCard,
} from '@origins-digital/types/ott';
import Image from 'next/image';

import 'react-multi-carousel/lib/styles.css';

import { IMG_PLACEHOLDER } from '$utils/constants';

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
  },
};

export default function Carousel(props: Readonly<CarouselSectionDTO>) {
  return (
    <div className={'w-full max-w-7xl pl-2 pr-10 lg:px-0'}>
      <h2 className={'font-bold px-8 uppercase text-white'}>{props.title}</h2>
      <MultiCarousel itemClass={'mx-3'} className={'py-8 px-4'} responsive={responsive}>
        {props.items.map((item) => {
          switch (item.itemType) {
            case 'video':
              return <VideoCard key={item.itemId} {...item} />;
            case 'playlist':
              return <PlaylistCard key={item.itemId} {...item} />;
          }
        })}
      </MultiCarousel>
    </div>
  );
}

function VideoCard(props: Readonly<OriginsVideoCard>) {
  return (
    <div
      className={
        'rounded-md border border-gray-700 ease-in cursor-pointer transition-all aspect-video hover:scale-110  relative overflow-hidden'
      }
    >
      <div className={'w-full z-[50] absolute top-0 bg-blue-500 h-[10px]'}></div>

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
      <Image className={'z-10 object-cover'} layout="fill" src={props.poster} alt={props.name} />
      <div
        className={
          'absolute w-full h-full  bg-gradient-to-b from-transparent via-transparent to-black z-30'
        }
      ></div>
    </div>
  );
}

function PlaylistCard(props: Readonly<OriginsPlaylistCard>) {
  return (
    <div
      className={
        'rounded-md border border-gray-700 ease-in cursor-pointer transition-all aspect-video hover:scale-110  relative overflow-hidden'
      }
    >
      <div className={'w-full z-[50] absolute top-0 bg-blue-500 h-[10px]'}></div>
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
        layout="fill"
        className={''}
        src={props.thumbnail || IMG_PLACEHOLDER}
        alt={props.name}
      />
      <div
        className={
          'absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-black z-30'
        }
      ></div>
    </div>
  );
}
