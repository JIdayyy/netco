import { IoPlay } from 'react-icons/io5';
import Carousel from 'react-multi-carousel';
import { OriginsVideoCard, SlideSection } from '@origins-digital/types/ott';
import Image from 'next/image';

import { IMG_PLACEHOLDER } from '$utils/constants';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const renderer = ({ item }: { item: OriginsVideoCard }) => {
  switch (item.itemType) {
    case 'video':
      return (
        <div
          key={item._kenticoId}
          className={'w-full flex justify-center align-middle items-center h-[500px] relative'}
        >
          <div
            className={
              'absolute px-10 space-y-1 flex-col flex align-bottom items-start justify-end w-full max-w-7xl h-1/2 z-50'
            }
          >
            <p
              className={
                'text-white capitalize tablet:text-2xl desktop:text-4xl text-2xl font-bold'
              }
            >
              {item.name}
            </p>
            <p className={'text-white capitalize text-sm tablet:text-xl font-bold'}>
              {item.description}
            </p>

            <button
              className={
                'bg-slate-500 flex text-xs tablet:text-base space-x-2 items-center align-middle justify-center text-white px-2 py-1 rounded-sm'
              }
            >
              <span>Watch</span> <IoPlay size={20} />
            </button>
          </div>

          <Image
            className={'z-10'}
            src={item.poster ?? IMG_PLACEHOLDER}
            alt={'test'}
            layout={'fill'}
            objectFit={'cover'}
          />
          <div
            className={'absolute w-full h-full  bg-gradient-to-b from-transparent to-black z-30'}
          ></div>
        </div>
      );
    default:
      return null;
  }
};

export default function Slider({ items }: SlideSection) {
  return (
    <div className={'flex tablet:mb-12 mb-0 mt-0 tablet:mt-6 flex-col w-full'}>
      <Carousel responsive={responsive}>
        {items.reverse().map((item) => renderer({ item: item as OriginsVideoCard }))}
      </Carousel>
    </div>
  );
}
