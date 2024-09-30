'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';

import { useConfig } from '@/app/client-page';
import { cn } from '@/lib/utils';

export const OptionsBar = () => {
  const { config, setConfig } = useConfig();
  return (
    <div className="absolute bottom-0 left-[50%] -translate-x-[50%] flex items-end">
      <OptionEdge />
      <div className="bg-foreground gap-4 p-2 px-16 flex justify-center items-center rounded-t-[32px] h-full text-background">
        <Option label="mode" hasLabel>
          <OptionItem label="characters" />
          <OptionItem label="time" />
        </Option>
        {config.mode === 'characters' && (
          <Option label="characters">
            <OptionItem label="25" />
            <OptionItem label="50" />
            <OptionItem label="100" />
          </Option>
        )}
        {config.mode === 'time' && (
          <Option label="time">
            <OptionItem label="15" />
            <OptionItem label="30" />
            <OptionItem label="60" />
          </Option>
        )}
      </div>
      <OptionEdge className="scale-x-[-1]" />
    </div>
  );
};

type OptionProps = {
  label: string;
  children?: React.ReactNode;
  hasLabel?: boolean;
};

const Option = ({ label, children, hasLabel = false }: OptionProps) => {
  return (
    <AnimatePresence mode="wait">
      <div className="*:p-2 gap-4 h-full flex border border-background px-8 rounded-xl">
        {hasLabel && (
          <>
            <p>{label}</p> <p>||</p>
          </>
        )}
        <div className="flex !p-0">{children}</div>
      </div>
    </AnimatePresence>
  );
};

type OptionItemProps = {
  label: string;
};

const OptionItem = ({ label }: OptionItemProps) => {
  return (
    <button className="hover:bg-background p-2 px-4 h-full hover:text-foreground">
      {label}
    </button>
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
