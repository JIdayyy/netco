import React, { ReactNode } from 'react';
import { WebConfig } from '@origins-digital/types/web-experience';
import clsx from 'clsx';

import Header from './Header';

import Footer from '$components/Layout/Footer';
import Menu from '$components/Layout/Menu';

function Layout({ children, config }: Readonly<{ children: ReactNode; config: WebConfig }>) {
  if (!config) {
    return null;
  }

  return (
    <div className="flex min-h-screen relative w-full items-center flex-col overflow-hidden">
      <Header config={config.header} />
      <Menu config={config.header} />

      <main
        className={clsx(
          'mx-auto bg-background relative  flex w-full  flex-grow flex-col content-spacer overflow-hidden',
        )}
      >
        {children}
      </main>

      <Footer config={config} />
    </div>
  );
}

export default Layout;
