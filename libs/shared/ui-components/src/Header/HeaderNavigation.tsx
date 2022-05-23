import { FC } from 'react';

import clsx from 'clsx';

import { HeaderNavigationProvider } from './HeaderNavigationProvider/HeaderNavigationProvider';
import { HeaderBookingLink } from './Links/HeaderBookingLink';
import { THeaderNavigationProps } from './types';

export const HeaderNavigation: FC<THeaderNavigationProps> = ({
  navigation,
  bookACallLinkText,
  isNavigationOpen,
}) => (
  <nav
    className={clsx(
      'absolute inset-0 z-30 pt-[8rem] w-screen h-screen bg-black transition-transform motion-reduce:transition-none duration-300 ease-in-out',
      isNavigationOpen ? 'block' : 'hidden',
    )}
  >
    <div className="overflow-y-auto pb-[5rem] h-full">
      <ul
        id="menu"
        className="flex flex-col justify-start items-center px-[2rem] pt-[1.8rem]"
      >
        {navigation.map((navigationItem) => (
          <li
            className="w-full border-b border-b-white"
            key={navigationItem._uid}
          >
            <HeaderNavigationProvider
              navigationItem={navigationItem}
              isNavigationOpen={isNavigationOpen}
            />
          </li>
        ))}
      </ul>
      <HeaderBookingLink bookACallLinkText={bookACallLinkText} />
    </div>
  </nav>
);
