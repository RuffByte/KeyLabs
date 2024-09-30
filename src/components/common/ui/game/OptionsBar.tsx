'use client';

import React from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { CaseSensitive, Timer } from 'lucide-react';

import { GameConfig, useConfig } from '@/app/client-page';
import { cn } from '@/lib/utils';

export const OptionsBar = ({...props}: HTMLMotionProps<'div'>) => {
  const { config, setConfig } = useConfig();

  const handleChangeMode = (mode: string) => {
    setConfig({ ...config, mode: mode as GameConfig['config']['mode'] });
  };

  return (
    <motion.div {...props} className="absolute bottom-0 left-[50%] -translate-x-[50%] flex items-end">
      <OptionEdge />
      <motion.div
        className="bg-foreground gap-4 p-2 px-16 flex justify-center items-center rounded-t-[32px] h-full text-background"
        animate={{ width: 'full' }}
      >
        <Option label="mode" hasLabel>
          <OptionItem
            value="characters"
            name="mode"
            onChange={() => handleChangeMode('characters')}
            defaultChecked
          />
          <OptionItem
            value="time"
            name="mode"
            onChange={() => handleChangeMode('time')}
          />
        </Option>
        {config.mode === 'characters' && (
          <Option label={<CaseSensitive />} hasLabel>
            <OptionItem value="25" name="character" defaultChecked />
            <OptionItem value="50" name="character" />
            <OptionItem value="100" name="character" />
            <OptionItem value="150" name="character" />
          </Option>
        )}
        {config.mode === 'time' && (
          <Option label={<Timer />} hasLabel>
            <OptionItem value="15" name="time" />
            <OptionItem value="30" name="time" defaultChecked />
            <OptionItem value="60" name="time" />
          </Option>
        )}
      </motion.div>
      <OptionEdge className="scale-x-[-1]" />
    </motion.div>
  );
};

type OptionProps = {
  label: string | React.ReactNode;
  children?: React.ReactNode;
  hasLabel?: boolean;
};

const Option = ({ label, children, hasLabel = false }: OptionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="items-center gap-4 px-4 select-none h-full flex border border-background rounded-xl"
    >
      {hasLabel && (
        <>
          <div className="border-r pr-4">{label}</div>
        </>
      )}
      <div className="flex w-min !p-0.5 items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
};

type OptionItemProps = {
  value: string;
  name?: string;
  defaultChecked?: boolean;
  onChange?: () => void;
};

const OptionItem = ({
  value,
  name,
  onChange,
  defaultChecked = false,
}: OptionItemProps) => {
  return (
    <>
      <div className="peer w-min h-min relative">
        <input
          className="peer size-full cursor-pointer absolute opacity-0"
          type="radio"
          onChange={onChange}
          name={name}
          defaultChecked={defaultChecked}
        />
        <div className="peer-hover:bg-secondary peer-checked:!bg-background peer-checked:!text-foreground p-2 px-4 h-full hover:text-foreground">
          {value}
        </div>
      </div>
    </>
  );
};

const OptionEdge = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'edge-32 size-8 edge-40 bg-foreground border-r border-b border-foreground',
      className
    )}
  />
);
