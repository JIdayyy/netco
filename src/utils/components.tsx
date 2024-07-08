import { VideosCategory } from '@origins-digital/types/club-web';
import { OriginsPlaylistCard, OriginsVideoCard, SectionContent } from '@origins-digital/types/ott';

import AdSection from '../components/AdSection';
import Carousel from '../components/Carousel';
import Slider from '../components/Slider';

import DynamicCarousel from '$components/DynamicCarousel';
import GridSection from '$components/GridSection';

function NotFound({ itemType }: { itemType: string }) {
  return (
    <div className={'w-full  h-[100px] bg-slate-500 text-white'}>
      <p>Component {itemType} not found</p>
    </div>
  );
}

export type CustomCarouselProps = Omit<SectionContent, 'items'> & {
  items: (OriginsVideoCard | OriginsPlaylistCard | unknown)[];
};

export const componentRenderer = (component: SectionContent) => {
  switch (component._kenticoItemType) {
    case 'section_static_slider':
      return <Slider {...component} />;
    case 'section_static_ad':
      return <AdSection {...component} />;
    case 'section_static_carousel':
      return <Carousel name={component.title} items={component.items} />;
    case 'section_dynamic_carousel':
      return <DynamicCarousel {...component} />;
    case 'section_dynamic_grid_with_category':
      return <GridSection {...component} />;
    default:
      return <NotFound itemType={component._kenticoItemType} />;
  }
};
