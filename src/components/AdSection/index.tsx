import { AdvertisementSection } from '@origins-digital/types/ott';
import Image from 'next/image';
import Link from 'next/link';

export default function AdSection(props: AdvertisementSection) {
  return (
    <Link href={props.redirectionTarget} target={'_blank'} className={'w-full'} legacyBehavior>
      <Image
        src={props.image[0].image.url}
        alt={props.image[0].image.name}
        width={props.image[0].image.width}
        height={props.image[0].image.height}
        className={'cursor-pointer'}
      />
    </Link>
  );
}
