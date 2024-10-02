'use client';

import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { CaseSensitive, Timer } from 'lucide-react';

import { usePreConfig } from '@/app/client-page';
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
      className="absolute z-50 bottom-0 left-[50%] -translate-x-[50%] flex items-end"
    >
      <OptionEdge />
      <motion.div
        className="bg-foreground gap-4 p-2 px-16 flex justify-center items-center rounded-t-[32px] h-full text-background"
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
            <OptionItem
              value="5"
              name="character"
              onChange={() => handleSetChar(5)}
            />
            <OptionItem
              value="25"
              name="character"
              onChange={() => handleSetChar(25)}
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
            <OptionItem
              value="150"
              name="character"
              onChange={() => handleSetChar(150)}
            />
          </Option>
        )}
        {config.mode === 'time' && (
          <Option label={<Timer />} hasLabel>
            <OptionItem
              value="5"
              name="time"
              onChange={() => handleSetTime(5)}
            />
            <OptionItem
              value="15"
              name="time"
              onChange={() => handleSetTime(15)}
            />
            <OptionItem
              value="30"
              name="time"
              onChange={() => handleSetTime(30)}
              defaultChecked
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
      'edge-32 size-8 bg-foreground outline-r-4 outline-b-4 outline-foreground',
      className
    )}
  />
);
