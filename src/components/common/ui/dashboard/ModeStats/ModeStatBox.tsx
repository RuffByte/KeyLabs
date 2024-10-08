import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ModeStatBoxProps {
  title: string;
  lpm?: number;
  accuracy?: number;
  additionalStats?: {
    duration: string;
    lpm: number;
    raw: number;
    accuracy: number;
    date: string;
  };
}

const ModeStatBox = ({
  title,
  lpm,
  accuracy,
  additionalStats,
}: ModeStatBoxProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const hasStats = lpm !== undefined && accuracy !== undefined;

  return (
    <motion.div
      className="grid h-32 grid-rows-3 place-items-center rounded-lg p-2 text-center transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="best-stats"
            className="row-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-bold">{title}</h3>
            {hasStats ? (
              <>
                <p>LPM: {lpm?.toFixed(2)}</p>
                <p>Accuracy: {accuracy?.toFixed(2)}%</p>
              </>
            ) : (
              <p>No information</p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="detailed-stats"
            className="row-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {additionalStats ? (
              <>
                <p>{additionalStats?.duration}</p>
                <p>{additionalStats?.lpm} LPM</p>
                <p>{additionalStats?.raw} Raw</p>
                <p>{additionalStats?.accuracy}% Acc</p>
                <p>{additionalStats?.date}</p>
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
