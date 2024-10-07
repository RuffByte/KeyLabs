import React, { HTMLAttributes } from 'react';
import { ArrowRight, Crown, MoveRight, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

import { useGameContext } from '@/app/client-page';
import { GameData } from '@/app/types/gameData';
import { cn } from '@/lib/utils';
import Button from '../../Button';
import { useTransition } from '../transition/Transition';

interface StatBoxProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  className?: string;
}

//welcome back to anton front end (rip)
const StatBox = ({ label, value, className }: StatBoxProps) => {
  return (
    <div
      className={cn(
        'flex h-32 w-full flex-col items-center justify-center gap-1 rounded-xl bg-secondary text-background',
        className
      )}
    >
      <p>{label}</p>
      <h3 className="text-4xl">{value}</h3>
    </div>
  );
};

interface StatRowProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  className?: string;
}

const StatRow = ({ label, value, className }: StatRowProps) => {
  return (
    //cn magic wow (takes last argument over the first wow (wow magic))
    <div
      className={cn(
        'flex justify-between border-b-2 border-dashed border-b-black px-4 py-3',
        className
      )}
    >
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};

interface EndGameScreenProps extends HTMLAttributes<HTMLDivElement> {
  gameData: GameData | null;
}

export const EndGameScreen = ({ gameData }: EndGameScreenProps) => {
  const { handleRouteChange } = useTransition();
  const { handleResetGame } = useGameContext();
  if (!gameData) {
    return <div>No game data available.</div>; // Handle null case
  }

  return (
    <div className="flex w-[650px] flex-col text-lg">
      <StatRow label="Score" value={gameData.mode} className="px-0 text-xl" />
      <StatRow
        label="WPM / RAW"
        value={`${gameData.wpm} / ${gameData.rawWpm}`}
      />
      <StatRow
        label="LPM / RAW"
        value={`${gameData.lpm} / ${gameData.rawLpm}`}
      />
      <StatRow label="Accuracy" value={gameData.accuracy.toFixed(1) + '%'} />
      <div className="mt-4 grid grid-cols-4 gap-3">
        <StatBox label="Total Clicks" value={gameData.totalClick} />
        <StatBox label="Total Hits" value={gameData.totalHit} />
        <StatBox label="Time" value={gameData.totalTime} />
        <StatBox label="Target Size" value={gameData.targetSize} />
      </div>
      <div className="mt-11 flex items-center justify-center gap-16">
        <Button onClick={() => handleRouteChange('leaderboard')}>
          <Crown />
        </Button>
        <Button onClick={() => toast.warning('Not implemented...')}>
          <RotateCcw />
        </Button>
        <Button>
          <ArrowRight onClick={() => handleResetGame()} />
        </Button>
      </div>
    </div>
  );
};
