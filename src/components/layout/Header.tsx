import React from 'react';
import { FaUser } from 'react-icons/fa';
import { RiMenu2Fill } from 'react-icons/ri';
import { WebConfig } from '@origins-digital/types/web-experience';
import Image from 'next/image';
import Link from 'next/link';

import Menu from '$components/layout/Menu';
import { useAppContext } from '$contexts/AppContext';

function Header(config: Readonly<WebConfig['header']>): JSX.Element {
  const { isScrolled, toggleMenu } = useAppContext();

  return (
    <nav
      className={`w-full ${
        isScrolled ? 'bg-blue-600' : 'from-black to-transparent  bg-gradient-to-b'
      } fixed top-0 z-[9000] transition-all ease-in-out duration-300 flex justify-center`}
    >
      <Menu />

      <div className={'max-w-7xl px-10 py-4 flex w-full justify-between items-center align-middle'}>
        <button onClick={() => toggleMenu()} className={'!block desktop:!hidden  cursor-pointer'}>
          <RiMenu2Fill color={'white'} size={30} />
        </button>
        <Link href={'/'}>
          <Image
            className={'cursor-pointer !hidden desktop:!block'}
            src={config.logo!.url}
            alt={'origins digital logo'}
            width={config.logo!.width / 5}
            height={config.logo!.height / 5}
          />
        </Link>

        <div className={'flex justify-center align-middle items-center space-x-2'}>
          <ul className={'flex space-x-2'}>
            {config.menuItems.map((item) => {
              return (
                <li key={item._kenticoId} className={'uppercase'}>
                  <Link href={item.redirectionTarget}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
          <button
            className={
              'bg-blue-500 desktop:!flex hidden  items-center space-x-2 justify-center align-middle px-2 py-1 text-white cursor-pointer rounded-md'
            }
          >
            <p>Sign In</p> <FaUser size={15} />
          </button>
        </div>
        {/*<button
          onClick={() => toggleMenu()}
          className={'bg-blue-500 px-2 py-1 text-white cursor-pointer rounded-md'}
        >
          Toggle
        </button>*/}
      </div>
    </nav>
  );
}

export default Header;
