import React from 'react';

import { useScreen } from '@/app/client-page';

export const WordsBar = () => {
  const { screen } = useScreen();

  return (
    <div
      className="flex justify-between items-center h-[60px] px-6"
      style={{ width: screen.width }}
    >
      <h3 className="text-2xl font-bold">30</h3>
      <div className="h-full w-[600px] border-secondary rounded-full border-2"></div>
      <h3 className="text-2xl font-bold">30</h3>
    </div>
  );
};
