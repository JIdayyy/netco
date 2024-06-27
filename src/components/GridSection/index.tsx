import { useState } from 'react';
import {
  OriginsVideoCard,
  SectionDynamicGridWithCategory,
  SubCategory,
} from '@origins-digital/types/ott';

import GridVideoCard from '$components/GridSection/GridVideoCard';
import Button from '$components/UI/Button';

function GridSectionCategoriesTabs({
  categories,
  selected,
  setSelected,
}: Readonly<{
  categories: SubCategory[];
  selected: SubCategory | null;
  setSelected: (category: SubCategory | null) => void;
}>) {
  return (
    <div className={'w-full flex justify-start my-2 gap-2'}>
      <button className={'px-4 text-white hover:underline'} onClick={() => setSelected(null)}>
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelected(category)}
          className={`${
            selected === category
              ? 'bg-blue-500 text-white'
              : 'text-gray-300 hover:bg-blue-500 hover:text-white'
          } px-3 py-1 rounded-sm capitalize`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

const getTwoRandomVideos = (videos: OriginsVideoCard[]) => {
  return videos.sort(() => Math.random() - Math.random()).slice(0, 2);
};

export default function GridSection(config: Readonly<SectionDynamicGridWithCategory>) {
  const [videos, setVideos] = useState(config.Videos);
  const [selected, setSelected] = useState<SubCategory | null>(null);

  // simulate fake data by adding a random video to the list
  const handleMoreVideos = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    const randomVideos = config.Videos.slice(0, randomNumber);
    setVideos([...videos, ...randomVideos]);
  };
  console.log(videos);
  return (
    <div
      className={
        'w-full max-w-7xl flex flex-col justify-center items-center tablet:px-5 desktop:px-10 px-2 py-5 lg:px-0'
      }
    >
      <p className={'text-white w-full text-left uppercase font-bold'}>{config.title}</p>
      <GridSectionCategoriesTabs
        selected={selected}
        setSelected={setSelected}
        categories={config.SubCategories}
      />

      <div className={'w-full  gap-4 grid grid-cols-1 tablet:grid-cols-3  desktop:grid-cols-4'}>
        {selected
          ? getTwoRandomVideos(videos).map((v) => <GridVideoCard key={v.itemId} {...v} />)
          : videos.map((v) => <GridVideoCard key={v.itemId} {...v} />)}
      </div>

      <Button
        onClick={handleMoreVideos}
        size={'sm'}
        variant={'primary'}
        className={` transform translate-y-2`}
      >
        Show more
      </Button>
    </div>
  );
}
