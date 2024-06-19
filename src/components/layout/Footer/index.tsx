import React from 'react';
import { useQuery } from 'react-query';
import { WebConfig } from '@origins-digital/types/web-experience';
import Image from 'next/image';

import { Footer as OnRewicndFooter } from '@onrewind/ui';

function Footer() {
  const { data: webConfig } = useQuery<WebConfig>(
    'web-config',
    (): WebConfig => void 0 as unknown as WebConfig,
  );

  if (!webConfig) {
    return null;
  }

  return (
    <OnRewicndFooter
      links={{
        secondRow: [
          {
            name: 'Privacy Policy',
            redirectionTargetType: 'page',
            redirectionTarget: '/privacy-policy',
          },
        ],
        firstRow: [
          {
            redirectionTarget: '/terms-and-conditions',
            redirectionTargetType: 'page',
            name: 'Terms and Conditions',
          },
        ],
      }}
      variant={'ott'}
      logo={
        <Image
          src={webConfig.header.logo!.url}
          alt={'origins digital logo'}
          width={webConfig.header.logo!.width / 5}
          height={webConfig.header.logo!.height / 5}
        />
      }
      socialNetworks={[]}
      version={'0.0.1'}
    />
  );
}

export default Footer;
