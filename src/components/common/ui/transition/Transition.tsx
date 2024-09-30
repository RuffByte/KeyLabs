'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';

import { devConfig } from '@/devconfig';
import { cn } from '@/lib/utils';

type TransitionProps = {
  children: React.ReactNode;
};

type TransitionContext = {
  handleRouteChange: (path?: string) => void;
};

const TransitionContext = React.createContext({} as TransitionContext);

export const useTransition = () => {
  const context = React.useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};

const pageContainerVariants: Variants = {
  initial: { filter: 'blur(4px)' },
  animate: { filter: 'blur(4px)' },
  finish: { filter: 'blur(0px)' },
};

const SheetInVariants: Variants = {
  initial: { y: '100%' },
  animate: { y: '0%' },
};

const SheetOutVariants: Variants = {
  initial: { y: '0%' },
  animate: { y: '-100%' },
};

const NothingIn: Variants = {
  initial: {},
  animate: {},
};

const NothingOut: Variants = {
  initial: {},
  animate: {},
};

const Transition = ({ children }: TransitionProps) => {
  const router = useRouter();
  const handleRouteChange = (path = '/') => {
    if (!devConfig.PAGE_TRANSITION) {
      router.push(path);
    }
    if (isTransitioning) {
      return;
    }
    setTransitioning(true);
    setPath(path);
  };

  const handleTransitionRoute = () => {
    setTransitioning(false);
    router.push(path);
  };

  const [isTransitioning, setTransitioning] = useState(false);
  const [path, setPath] = useState('/');

  if (!devConfig.PAGE_TRANSITION) {
    return (
      <TransitionContext.Provider value={{ handleRouteChange }}>
        {children}
      </TransitionContext.Provider>
    );
  }

  return (
    <TransitionContext.Provider value={{ handleRouteChange }}>
      <motion.div
        className={cn(
          'origin-bottom w-dvw overflow-x-hidden relative',
          isTransitioning && 'overflow-hidden h-dvh relative'
        )}
        initial="initial"
        animate={isTransitioning ? 'animate' : 'finish'}
        transition={{ ease: 'easeOut', duration: isTransitioning ? 0.3 : 0 }}
        variants={pageContainerVariants}
      >
        {children}
      </motion.div>
      {/* transition */}
      <div className="fixed inset-0 z-[999] overflow-hidden pointer-events-none">
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 size-full bg-slate-800"
            initial="initial"
            animate="animate"
            transition={{ ease: 'easeOut', duration: 0.2, delay: 0.3 }}
            variants={SheetInVariants}
            onAnimationComplete={handleTransitionRoute}
          />
        )}
        {!isTransitioning && (
          <motion.div
            className="absolute inset-0 size-full bg-slate-800"
            initial="initial"
            animate="animate"
            transition={{ ease: 'easeOut', duration: 0.2 }}
            variants={SheetOutVariants}
          />
        )}
      </div>
    </TransitionContext.Provider>
  );
};

export default Transition;
