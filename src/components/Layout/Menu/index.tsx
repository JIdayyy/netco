import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { WebConfig } from '@origins-digital/types/web-experience';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppContext } from '$contexts/AppContext';

interface MenuItemProps {
  item: WebConfig['header']['menuItems'][number];
  onClick: () => void;
}

function MenuItem({ item, onClick }: MenuItemProps) {
  const router = useRouter();
  const handleClick = () => {
    if (item.subItems.length > 0) {
      return onClick();
    }
    router.push(item.redirectionTarget);
  };
  return (
    <li key={item._kenticoId} className={'uppercase font-bold text-white'}>
      <button onClick={handleClick}>{item.name}</button>
    </li>
  );
}

export default function Menu({ config }: { config: WebConfig['header'] }) {
  const { isMenuOpen, toggleMenu } = useAppContext();
  const [selected, setSelected] = React.useState<WebConfig['header']['menuItems'][number] | null>(
    null,
  );

  return (
    <>
      <button
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[8999]"
        onClick={toggleMenu}
        style={{ display: isMenuOpen ? 'block' : 'none' }}
      />
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-black z-[9000] ${
          isMenuOpen ? '-translate-x-0' : '-translate-x-[100%]'
        } transform transition-transform duration-300`}
      >
        <div className="h-full pt-24 flex flex-col justify-start items-center">
          <nav>
            {!selected ? (
              <ul className={'flex justify-start space-y-4 flex-col'}>
                <Link href={'/'}>
                  <li className={'capitalize font-bold text-white'}>Home</li>
                </Link>
                {config.menuItems.map((item) => {
                  return (
                    <MenuItem
                      onClick={() => {
                        setSelected(item);
                      }}
                      item={item}
                      key={item._kenticoId}
                    />
                  );
                })}
              </ul>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setSelected(null);
                  }}
                  className={'w-full mb-4 flex justify-start items-center'}
                >
                  <IoIosArrowBack color={'white'} />
                  <p className={'text-white font-bold text-2xl hover:underline'}>Back</p>
                </button>
                <ul className={'flex justify-start space-y-3 flex-col'}>
                  {selected.subItems.map((item) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setSelected(item);
                        }}
                        item={item}
                        key={item._kenticoId}
                      />
                    );
                  })}
                </ul>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
