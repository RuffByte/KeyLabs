'use client';

import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { Info, Settings, User } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Dropdown, DropdownLinkItem } from '../wrapper/dropdown';
import { Keylabslogo } from './keylabslogo';

interface NavigationBarProp extends HTMLMotionProps<'div'> {
  enabled?: boolean;
}

export const NavigationBar = ({ ...props }: NavigationBarProp) => {
  return (
    <motion.div
      {...props}
      className={cn(
        'flex absolute w-full items-center justify-between top-4',
        props.className
      )}
    >
      <Keylabslogo />
      <div className="flex gap-4 p-2 justify-center items-center hover:*:stroke-secondary">
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
      </div>
    </motion.div>
  );
};
