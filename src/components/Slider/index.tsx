import { IoPlay } from 'react-icons/io5';
import Carousel from 'react-multi-carousel';
import Image from 'next/image';

import 'react-multi-carousel/lib/styles.css';

const sliderItems = [
  {
    itemType: 'video',
    name: 'Nascar championship',
    subName: '2021',
    poster:
      'https://dev-onrewind.imgix.net/thumbnails/1c08d7e1-0b44-4874-b10c-a72e55b23c24/img-59554.png',
    itemId: '1',
  },
  {
    itemType: 'video',
    name: 'Racing Amilton',
    subName: '2021',
    poster:
      'https://dev-onrewind.imgix.net/thumbnails/34c738cf-9206-4e9e-bbf9-ae0bb9f70110/img-55883.png',
    itemId: '2',
  },
  {
    itemType: 'video',
    name: 'F1 championship',
    subName: '2021',
    poster:
      'https://dev-onrewind.imgix.net/thumbnails/fe4dcc88-d6b5-4cdf-af5d-4cec568791db/img-30300.jpg',
    itemId: '3',
  },
];

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

export default function Slider() {
  return (
    <div className={'flex flex-col w-full'}>
      <Carousel showDots responsive={responsive}>
        {sliderItems.map((item) => {
          return (
            <div
              key={item.itemId}
              className={
                'w-full flex justify-center align-middle items-center aspect-video relative'
              }
            >
              <div
                className={
                  'absolute px-10 space-y-1 flex-col flex align-bottom items-start justify-end w-full max-w-7xl h-1/2 z-50'
                }
              >
                <p className={'text-white capitalize text-4xl font-bold'}>{item.name}</p>
                <p className={'text-white capitalize text-xl font-bold'}>{item.subName}</p>

                <button
                  className={
                    'bg-blue-500 flex space-x-2 items-center align-middle justify-center text-white px-2 py-1 rounded-md'
                  }
                >
                  <span>Watch</span> <IoPlay size={20} />
                </button>
              </div>

              <Image
                className={'z-10'}
                src={item.poster}
                alt={'test'}
                layout={'fill'}
                objectFit={'cover'}
              />
              <div
                className={
                  'absolute w-full h-full  bg-gradient-to-b from-transparent to-black z-30'
                }
              ></div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
