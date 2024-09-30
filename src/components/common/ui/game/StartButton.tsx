'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Waypoints } from 'lucide-react';

export const StartButton = () => {
  return (
    <div className="absolute left-1/2 top-1/2 [translate:-50%_-50%] size-16 grid place-items-center">
      <div className="absolute bg-foreground -z-10 animate-ping rounded-full size-5/6 grid " />
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="bg-foreground grid place-items-center cursor-pointer rounded-full size-full"
      >
        <Waypoints color="hsl(var(--background))" />
      </motion.button>
    </div>
  );
};
