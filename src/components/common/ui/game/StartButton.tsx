'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Waypoints } from 'lucide-react';

import { useGameContext } from '@/app/client-page';

export const StartButton = () => {
  const { handleStartGame } = useGameContext();
  return (
    <div className="absolute left-1/2 top-1/2 z-[999] grid size-16 place-items-center [translate:-50%_-50%]">
      <div className="absolute -z-10 grid size-5/6 animate-ping rounded-full bg-foreground" />
      <motion.button
        onClick={handleStartGame}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="grid size-full cursor-pointer place-items-center rounded-full bg-foreground"
      >
        <Waypoints color="hsl(var(--background))" />
      </motion.button>
    </div>
  );
};
