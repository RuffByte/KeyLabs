'use client';

import React from 'react';
import { Check } from 'lucide-react';

import themes from '@/static/themes/_list.json';
import { useTheme } from '../wrapper/ThemeProvider';

export const ThemeSelectionDialog = () => {
  const { theme: currentTheme, handleSetTheme } = useTheme();
  return (
    <div className="min-w-[600px] pb-8 text-foreground">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-2xl">Themes</h3>
      </div>
      {(themes as string[]).map((theme) => (
        <ThemeItem
          key={theme}
          name={theme}
          currentLang={currentTheme}
          onClick={() => {
            handleSetTheme(theme);
          }}
        />
      ))}
    </div>
  );
};

type ThemeItemProps = {
  name: string;
  currentLang: string;
  onClick: () => void;
};
const ThemeItem = ({ name, currentLang, onClick }: ThemeItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full cursor-pointer select-none items-center py-2 hover:bg-foreground hover:text-background"
    >
      <div className="mx-4 min-w-5">
        {name.toLowerCase() == currentLang.toLowerCase() ? (
          <Check size={20} />
        ) : null}
      </div>
      {name}
    </button>
  );
};
