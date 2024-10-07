'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { HTMLMotionProps, motion } from 'framer-motion';
import { Crown, Info, Settings, User } from 'lucide-react';
import { toast } from 'sonner';

import { useCurrentGame } from '@/app/client-page';
import { cn } from '@/lib/utils';
import { NavigationOutVariants } from '@/lib/variants/variants';
import Button from '../../Button';
import Dialog, { DialogContent, DialogTriggerButton } from '../../Dialog';
import { ThemeSelectionDialog } from '../game/ThemeSelectDialog';
import { useTransition } from '../transition/Transition';
import { Dropdown, DropdownLinkItem } from '../wrapper/dropdown';
import { Keylabslogo } from './keylabslogo';

interface NavigationBarProp extends HTMLMotionProps<'div'> {
  enabled?: boolean;
}

export const NavigationBar = ({ ...props }: NavigationBarProp) => {
  const { hasStart, hasFinish } = useCurrentGame();
  const { handleRouteChange } = useTransition();
  return (
    <Dialog>
      <motion.div
        {...props}
        className={cn(
          'absolute top-4 z-50 flex w-desktop items-center justify-between',
          props.className
        )}
      >
        <Keylabslogo />
        <motion.div
          className="flex items-center justify-center gap-4 p-2 hover:*:stroke-secondary"
          animate="animate"
          variants={NavigationOutVariants(hasStart, hasFinish)}
        >
          <Button onClick={() => handleRouteChange('leaderboard')}>
            <Crown size={20} />
          </Button>
          <DialogTriggerButton>
            <Crown size={20} />
          </DialogTriggerButton>
          <Button onClick={() => toast.warning('Not implemented...')}>
            <Info size={20} />
          </Button>
          <Button onClick={() => toast.warning('Not implemented...')}>
            <Settings size={20} />
          </Button>
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
      <DialogContent>
        <ThemeSelectionDialog />
      </DialogContent>
    </Dialog>
  );
};
