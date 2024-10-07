'use client';

import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { CaseSensitive, Timer } from 'lucide-react';

import { usePreConfig } from '@/app/client-page';
import { devConfig } from '@/devconfig';
import { cn } from '@/lib/utils';

export const OptionsBar = ({ ...props }: HTMLMotionProps<'div'>) => {
  const { config, setConfig } = usePreConfig();

  const handleChangeMode = (mode: string) => {
    if (config.mode === 'characters')
      setConfig({ ...config, mode: mode, lengthChar: 0, time: 30 });
    else setConfig({ ...config, mode: mode, lengthChar: 25, time: 0 });
  };

  const handleSetTime = (time: number) => {
    setConfig({ ...config, lengthChar: 0, time: time });
  };

  const handleSetChar = (length: number) => {
    setConfig({ ...config, lengthChar: length, time: 0 });
  };

  return (
    <motion.div
      {...props}
      className="absolute bottom-0 left-[50%] z-50 flex -translate-x-[50%] items-end"
    >
      <OptionEdge />
      <motion.div
        className="flex h-full items-center justify-center gap-4 rounded-t-[32px] bg-foreground p-2 px-16 text-background"
        animate={{ width: 'full' }}
      >
        <Option label="mode" hasLabel>
          <OptionItem
            value="characters"
            name="mode"
            onChange={() => {
              handleChangeMode('characters');
            }}
            defaultChecked
          />
          <OptionItem
            value="time"
            name="mode"
            onChange={() => {
              handleChangeMode('time');
            }}
          />
        </Option>
        {config.mode === 'characters' && (
          <Option label={<CaseSensitive />} hasLabel>
            {devConfig.ENABLE_DEBUG_GAMEMODE_OPTION && (
              <OptionItem
                value="5"
                name="character"
                onChange={() => handleSetChar(5)}
              />
            )}
            <OptionItem
              value="30"
              name="character"
              onChange={() => handleSetChar(30)}
              defaultChecked
            />
            <OptionItem
              value="50"
              name="character"
              onChange={() => handleSetChar(50)}
            />
            <OptionItem
              value="100"
              name="character"
              onChange={() => handleSetChar(100)}
            />
          </Option>
        )}
        {config.mode === 'time' && (
          <Option label={<Timer />} hasLabel>
            {devConfig.ENABLE_DEBUG_GAMEMODE_OPTION && (
              <OptionItem
                value="5"
                name="time"
                onChange={() => handleSetTime(5)}
              />
            )}
            <OptionItem
              value="15"
              name="time"
              onChange={() => handleSetTime(15)}
              defaultChecked
            />
            <OptionItem
              value="30"
              name="time"
              onChange={() => handleSetTime(30)}
            />
            <OptionItem
              value="60"
              name="time"
              onChange={() => handleSetTime(60)}
            />
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
      className="flex h-full select-none items-center gap-4 rounded-xl border border-background px-4"
    >
      {hasLabel && (
        <>
          <div className="border-r pr-4">{label}</div>
        </>
      )}
      <div className="flex w-min items-center justify-center !p-0.5">
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
      <div className="peer relative h-min w-min">
        <input
          className="peer absolute size-full cursor-pointer opacity-0"
          type="radio"
          onChange={onChange}
          name={name}
          defaultChecked={defaultChecked}
        />
        <div className="h-full p-2 px-4 hover:text-foreground peer-checked:!bg-background peer-checked:!text-foreground peer-hover:bg-secondary">
          {value}
        </div>
      </div>
    </>
  );
};

const OptionEdge = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'edge-32 outline-r-4 outline-b-4 size-8 bg-foreground outline-foreground',
      className
    )}
  />
);
