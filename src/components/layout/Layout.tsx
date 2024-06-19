import { WebConfig } from '@origins-digital/types/web-experience';
import clsx from 'clsx';

import Footer from './Footer';
import Header from './Header';

function Layout({
  children,
  config,
}: {
  children: React.ReactNode;
  config: WebConfig;
}): JSX.Element {
  return (
    <div className="flex min-h-screen w-full items-center flex-col overflow-hidden">
      <Header {...config.header} />

      <main
        className={clsx(
          'mx-auto bg-background flex w-full  flex-grow flex-col content-spacer overflow-hidden',
        )}
      >
        {children}
      </main>

      <Footer {...config.footer} />
    </div>
  );
}

export default Layout;
