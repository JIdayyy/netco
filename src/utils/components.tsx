import { SectionContent } from '@origins-digital/types/ott';

import AdSection from '../components/AdSection';
import Carousel from '../components/Carousel';
import Slider from '../components/Slider';

import DynamicGrid from '$components/DynamicGrid';
import GridSection from '$components/GridSection';

function NotFound({ itemType }: { itemType: string }) {
  return (
    <div className={'w-full  h-[100px] bg-blue-500 text-white'}>
      <p>Component {itemType} not found</p>
    </div>
  );
}

export const componentRenderer = (component: SectionContent) => {
  switch (component._kenticoItemType) {
    case 'section_static_slider':
      return <Slider {...component} />;
    case 'section_static_ad':
      return <AdSection {...component} />;
    case 'section_static_carousel':
      return <Carousel {...component} />;
    case 'section_dynamic_grid_with_category':
      return <GridSection {...component} />;

    default:
      return <NotFound itemType={component._kenticoItemType} />;
  }
};
