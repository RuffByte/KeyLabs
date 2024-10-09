import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { dateToHHMMSS } from '@/lib/utils/date';
import { BestGame } from '../AccountDetails/UserContext';

interface ModeStatBoxProps extends Partial<BestGame> {
  label: string;
}

const ModeStatBox = ({ label, ...bestScore }: ModeStatBoxProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const hasStats =
    bestScore.lpm !== undefined && bestScore.accuracy !== undefined;

  const date = new Date(bestScore?.createdAt || '');

  return (
    <motion.div
      className="flex h-32 w-[160px] flex-col place-items-center justify-center rounded-lg p-2 text-center transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="best-stats"
            className="flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-bold">{label}</h3>
            {hasStats ? (
              <>
                <p>LPM: {bestScore.lpm?.toFixed(2)}</p>
                <p>Accuracy: {bestScore.accuracy?.toFixed(2)}%</p>
              </>
            ) : (
              <p>No information</p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="detailed-stats"
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {hasStats ? (
              <>
                <strong>{label}</strong>
                <p>
                  LPM: {bestScore?.lpm} /{bestScore?.rawLpm}
                </p>
                <p>Accuracy: {bestScore?.accuracy}% </p>
                <p>{date.toLocaleDateString()}</p>
              </>
            ) : (
              <p>No additional information</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ModeStatBox;
