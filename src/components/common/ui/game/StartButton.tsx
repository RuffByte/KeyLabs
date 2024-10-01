'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Waypoints } from 'lucide-react';

import { useCurrentGame } from '@/app/client-page';

export const StartButton = () => {
  const { isPlaying } = useCurrentGame();
  return (
    <div className="absolute z-[999] left-1/2 top-1/2 [translate:-50%_-50%] size-16 grid place-items-center">
      <div className="absolute bg-foreground -z-10 animate-ping rounded-full size-5/6 grid " />
      <motion.button
        onClick={isPlaying}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-foreground grid place-items-center cursor-pointer rounded-full size-full"
      >
        <Waypoints color="hsl(var(--background))" />
      </motion.button>
    </div>
  );
};
