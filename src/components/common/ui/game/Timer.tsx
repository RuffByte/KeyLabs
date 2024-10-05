import React, { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { Timer } from 'lucide-react';

import { useGameContext, usePreConfig } from '@/app/client-page';

export const GameTimer = () => {
  const { config } = usePreConfig();
  const { Gamedata } = useGameContext();

  const refTimer = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (config.mode !== 'time' || !Gamedata.hasStart || !Gamedata.totalTime)
      return;

    const timer = refTimer.current;
    if (!timer) return;

    const startTime = new Date();

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = Math.floor(
        (currentTime.getTime() - startTime.getTime()) / 1000
      );
      const remainingTime = config.time - elapsedTime;
      if (remainingTime <= 0) {
        clearInterval(intervalId);
        Gamedata.handleFinish();
      }

      if (refTimer.current) {
        refTimer.current.innerHTML = `${remainingTime}s`;
      }
    }, 100);
  }, [Gamedata.totalTime, Gamedata.hasStart]);

  return (
    <h3 className="text-2xl">
      <p className="flex min-w-32 items-center justify-end gap-2 rounded-md bg-foreground p-2 px-4 text-background">
        {Gamedata.hasStart ? (
          <span ref={refTimer}>
            {Gamedata.totalTime ? `${config.time}s` : '0s'}
          </span>
        ) : (
          <span>{config.time ? `${config.time}s` : '0s'}</span>
        )}
        <Timer size={32} />
      </p>
    </h3>
  );
};
