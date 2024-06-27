import React from 'react';
import { WebConfig } from '@origins-digital/types/web-experience';
import Image from 'next/image';

import { Footer as OnRewicndFooter } from '@onrewind/ui';

import { IMG_PLACEHOLDER } from '$utils/constants';

function Footer({ config }: Readonly<{ config: WebConfig }>) {
  return (
    <OnRewicndFooter
      itemTitleClassName={'text-white'}
      itemClassName={'text-white'}
      linksClassName={'text-white'}
      socialIconClassName={'text-white'}
      subItemClassName={'text-white'}
      className={'from-blue-600 text-white via-blue-800 to-blue-600 bg-gradient-to-r mt-24'}
      links={{
        secondRow: [
          {
            name: 'EMG GROUP',
            redirectionTargetType: 'page',
            redirectionTarget: '/emg-group',
          },
        ],
        firstRow: [
          {
            redirectionTarget: '/terms-and-conditions',
            redirectionTargetType: 'page',
            name: 'ORIGINS DIGITAL',
          },
          {
            name: 'FORMULA ONE 2021',
            redirectionTargetType: 'page',
            redirectionTarget: '/formula-1',
          },
        ],
      }}
      variant={'ott'}
      logo={
        <Image
          src={config.header.logo?.url || IMG_PLACEHOLDER}
          alt={'origins digital logo'}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          width={+config.header.logo.width / 5}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          height={+config.header.logo.height / 5}
        />
      }
      socialNetworks={[]}
      version={'0.0.1'}
    />
  );
}

export default Footer;
