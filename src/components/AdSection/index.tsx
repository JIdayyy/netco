import { AdvertisementSection } from '@origins-digital/types/ott';
import Image from 'next/image';

export default function AdSection(props: Readonly<AdvertisementSection>) {
  return (
    <div className={'w-full my-6'}>
      <Image
        src={props.image[0].image.url}
        alt={props.image[0].image.name}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        width={props.image[0].image.width + 20}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        height={props.image[0].image.height + 20}
        className={'cursor-pointer'}
      />
    </div>
  );
}
