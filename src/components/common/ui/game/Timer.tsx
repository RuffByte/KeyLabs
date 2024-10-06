import React, { forwardRef } from 'react';
import { Timer } from 'lucide-react';

import { useGameContext, usePreConfig } from '@/app/client-page';

export const GameTimer = forwardRef<HTMLSpanElement>((props, ref) => {
  const { config } = usePreConfig();
  const { Gamedata } = useGameContext();

  return (
    <h3 className="text-2xl">
      <p className="flex min-w-32 items-center justify-end gap-2 rounded-md bg-foreground p-2 px-4 text-background">
        {Gamedata.hasStart ? (
          <span ref={ref}>
            {config.mode === 'time' ? `${config.time}s` : '0s'}
          </span>
        ) : (
          <span>{config.time ? `${config.time}s` : '0s'}</span>
        )}
        <Timer size={32} />
      </p>
    </h3>
  );
});
//need this for build i guess
GameTimer.displayName = 'GameTimer';
