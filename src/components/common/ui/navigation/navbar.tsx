'use client';

import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { Info, Settings, User } from 'lucide-react';

import { useCurrentGame } from '@/app/client-page';
import { cn } from '@/lib/utils';
import { Dropdown, DropdownLinkItem } from '../wrapper/dropdown';
import { Keylabslogo } from './keylabslogo';

interface NavigationBarProp extends HTMLMotionProps<'div'> {
  enabled?: boolean;
}

export const NavigationBar = ({ ...props }: NavigationBarProp) => {
  const { hasStart } = useCurrentGame();
  return (
    <motion.div
      {...props}
      className={cn(
        'flex absolute w-desktop items-center justify-between top-4 z-50',
        props.className
      )}
    >
      <Keylabslogo />
      <motion.div
        className="flex gap-4 p-2 justify-center items-center hover:*:stroke-secondary"
        animate={{ opacity: hasStart ? 0 : 1, y: hasStart ? '-100%' : '0%' }}
      >
        <Info size={20} />
        <Settings size={20} />
        <Dropdown
          dropdownDisplay={<User size={20} />}
          dropdownItems={
            <DropdownLinkItem
              href="/login"
              dropdownItem={['User profile', 'Log out']}
            />
          }
        ></Dropdown>
      </motion.div>
    </motion.div>
  );
};
