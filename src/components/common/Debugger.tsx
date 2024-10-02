import React from 'react';

import { useGameContext } from '@/app/client-page';

export const Debugger = () => {
  const { Gamedata } = useGameContext();
  return (
    <div className="bg-foreground text-2xl text-background absolute z-[9999] p-2 ">
      {Object.keys(Gamedata).map((key) => (
        <p key={key}>
          {key} {typeof Gamedata[key]}:
          {(key === 'words' && `${Gamedata[key].length} total words`) ||
            (typeof Gamedata[key] === 'boolean' &&
              (Gamedata[key] ? 'true' : 'false')) ||
            (Gamedata[key] as any)}
        </p>
      ))}
    </div>
  );
};
