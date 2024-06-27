import { useState } from 'react';
import { SectionDynamicGridWithCategory, SubCategory } from '@origins-digital/types/ott';

import GridVideoCard from '$components/GridSection/GridVideoCard';
import Button from '$components/UI/Button';

function GridSectionCategoriesTabs({ categories }: Readonly<{ categories: SubCategory[] }>) {
  const [selected, setSelected] = useState<SubCategory | null>();

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

export default function GridSection(config: Readonly<SectionDynamicGridWithCategory>) {
  return (
    <div
      className={
        'w-full max-w-7xl flex flex-col justify-center items-center tablet:px-5 desktop:px-10 px-2 py-5 lg:px-0'
      }
    >
      <p className={'text-white w-full text-left uppercase font-bold'}>{config.title}</p>
      <GridSectionCategoriesTabs categories={config.SubCategories} />

      <div className={'w-full  gap-4 grid grid-cols-1 tablet:grid-cols-3  desktop:grid-cols-4'}>
        {config.Videos.map((v) => (
          <GridVideoCard key={v.itemId} {...v} />
        ))}
      </div>

      <Button size={'sm'} variant={'primary'} className={` transform translate-y-2`}>
        Show more
      </Button>
    </div>
  );
}
