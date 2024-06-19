import { useState } from 'react';
import { SectionDynamicGridWithCategory, SubCategory } from '@origins-digital/types/ott';

import GridVideoCard from '$components/GridSection/GridVideoCard';

function GridSectionCategoriesTabs({ categories }: Readonly<{ categories: SubCategory[] }>) {
  const [selected, setSelected] = useState<SubCategory | null>();

  return (
    <div className={'w-full flex justify-start gap-2'}>
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
          } px-4 py-2 rounded-md capitalize`}
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
        'w-full max-w-7xl flex flex-col justify-center items-center px-10 space-y-2 lg:px-0'
      }
    >
      <p className={'text-white w-full text-left uppercase font-bold'}>{config.title}</p>
      <GridSectionCategoriesTabs categories={config.SubCategories} />

      <div className={'w-full  gap-4 grid  tablet:grid-cols-3 grid-cols-2 desktop:grid-cols-4'}>
        {config.Videos.map((v) => (
          <GridVideoCard key={v.itemId} {...v} />
        ))}
      </div>

      <button
        className={`px-2 my-1 w-fit py-1 bg-blue-500 text-white text-xs rounded-md capitalize`}
      >
        Show more
      </button>
    </div>
  );
}
