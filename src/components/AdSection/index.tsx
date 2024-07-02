import { AdvertisementSection } from '@origins-digital/types/ott';
import Image from 'next/image';
import Link from 'next/link';

export default function AdSection(props: Readonly<AdvertisementSection>) {
  return (
    <Link href={props.redirectionTarget} target={'_blank'} className={'w-full my-28'}>
      <Image
        src={props.image[0].image.url}
        alt={props.image[0].image.name}
        // @ts-ignore
        width={props.image[0].image.width + 20}
        // @ts-ignore
        height={props.image[0].image.height + 20}
        className={'cursor-pointer my-24'}
      />
    </Link>
  );
}
