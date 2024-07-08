import React from 'react';
import { RiMenu2Fill } from 'react-icons/ri';
import { WebConfig } from '@origins-digital/types/web-experience';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '$components/UI/Button';
import { useAppContext } from '$contexts/AppContext';

function Header({ config }: { config: WebConfig['header'] }): JSX.Element {
  const { isScrolled, toggleMenu, isMenuOpen, isAuth, handleSignOut } = useAppContext();
  const router = useRouter();

  return (
    <motion.nav
      variants={{
        scrolled: {
          backgroundColor: '#f16305',
          transition: {
            duration: 0,
            delay: 0,
          },
        },
        notScrolled: {
          backgroundColor: 'transparent',
          transition: {
            duration: 0,
            delay: 0,
          },
        },
      }}
      initial={'notScrolled'}
      animate={isScrolled || isMenuOpen ? 'scrolled' : 'notScrolled'}
      className={`w-full   ${
        !isScrolled && !isMenuOpen && 'bg-gradient-to-b from-black via-black to-transparent'
      } fixed top-0 z-[8999] transition-all ease-in-out duration-300 text-white flex justify-center`}
    >
      <div
        className={
          'max-w-7xl py-2   tablet:py-4 flex w-full justify-between items-stretch  align-middle'
        }
      >
        <button
          onClick={() => toggleMenu()}
          className={'!block desktop:!invisible flex-1 cursor-pointer'}
        >
          <RiMenu2Fill color={'white'} size={30} />
        </button>
        <Link className={'flex-1'} href={'/'}>
          <Image
            className={'cursor-pointer  tablet:!block'}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            src={config.logo.url}
            alt={'origins digital logo'}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            width={+config.logo.width / 6}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            height={+config.logo.height / 6}
          />
        </Link>

        <div
          className={'tablet:flex flex-1 justify-end hidden align-middle items-center space-x-2'}
        >
          <ul className={'flex space-x-2'}>
            {config.menuItems.map((item) => {
              return (
                <li key={item._kenticoId} className={'uppercase'}>
                  <Link href={item.redirectionTarget}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
          <Button
            size={'sm'}
            variant={'primary'}
            onClick={() => {
              if (!isAuth) {
                router.push('/auth/signin');
              } else {
                handleSignOut();
              }
            }}
            className={
              'bg-slate-500 cursor-pointer desktop:!flex hidden  items-center space-x-2 justify-center align-middle px-2 py-1 text-white  rounded-sm'
            }
          >
            {!isAuth ? <p>Sign In</p> : <p>Sign Out</p>}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Header;
