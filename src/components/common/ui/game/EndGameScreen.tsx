import React from 'react';
import { Crown, MoveRight, RotateCcw } from 'lucide-react';

import { cn } from '@/lib/utils';

//welcome back to anton front end (rip)
const StatBox = ({
  title,
  stat,
  className,
}: {
  title: string;
  stat: string;
  className?: string;
}) => {
  return (
    <div className="bg-highlight flex h-24 w-full flex-col items-center justify-center rounded-xl">
      <h1>{title}</h1>
      <p className="text-3xl">{stat}</p>
    </div>
  );
};

const StatRow = ({
  title,
  stat,
  className,
}: {
  title: string;
  stat: string;
  className?: string;
}) => {
  return (
    //cn magic wow (takes last argument over the first wow (wow magic))
    <div
      className={cn(
        'flex justify-between border-b-2 border-dashed border-b-black px-4 py-3',
        className
      )}
    >
      <p>{title}</p>
      <p>{stat}</p>
    </div>
  );
};

export const EndGameScreen = () => {
  return (
    <div className="flex w-[500px] flex-col">
      <StatRow title={'Score'} stat={'English 5k'} className="px-0" />
      <StatRow title={'Score'} stat={'English 5k'} />
      <StatRow title={'Score'} stat={'English 5k'} />
      <StatRow title={'Score'} stat={'English 5k'} />
      <div className="mt-4 grid grid-cols-4 gap-3">
        <StatBox title={'Total Clicks'} stat={'46'}></StatBox>
        <StatBox title={'Total Clicks'} stat={'46'}></StatBox>
        <StatBox title={'Total Clicks'} stat={'46'}></StatBox>
        <StatBox title={'Total Clicks'} stat={'46'}></StatBox>
      </div>
      <div className="mt-11 flex items-center justify-center gap-16">
        <Crown />
        <RotateCcw />
        <MoveRight />
      </div>
    </div>
  );
};
