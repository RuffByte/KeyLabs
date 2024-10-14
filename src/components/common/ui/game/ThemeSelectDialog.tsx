'use client';

import React from 'react';
import { Preview } from '@react-email/components';
import { Check } from 'lucide-react';

import themes from '@/static/themes/_list.json';
import { useTheme } from '../wrapper/ThemeProvider';

type themeType = {
  name: string;
  preview: {
    background: string;
    secondary: string;
    foreground: string;
    tertiary: string;
  };
};

export const ThemeSelectionDialog = () => {
  const { theme: currentTheme, handleSetTheme } = useTheme();
  return (
    <div className="min-w-[600px] pb-8 text-foreground">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-2xl">Themes</h3>
      </div>
      {(themes as themeType[]).map((theme) => (
        <ThemeItem
          key={theme.name}
          name={theme.name}
          currentLang={currentTheme}
          onClick={() => {
            handleSetTheme(theme.name);
          }}
          preview={theme.preview}
        />
      ))}
    </div>
  );
};

type ThemeItemProps = {
  name: string;
  currentLang: string;
  onClick: () => void;
  preview: themeType['preview'];
};
const ThemeItem = ({ name, preview, currentLang, onClick }: ThemeItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full cursor-pointer select-none items-center justify-between py-2 hover:bg-foreground hover:text-background"
    >
      <div className="flex items-center justify-center">
        <div className="mx-4 min-w-5">
          {name.toLowerCase() == (currentLang?.toLowerCase() ?? 'default') ? (
            <Check size={20} />
          ) : null}
        </div>
        {name}
      </div>
      <div
        className="mr-2 flex h-full gap-2 rounded-md p-1.5 *:h-4 *:w-4 *:rounded-full"
        style={{ background: preview.background }}
      >
        <div style={{ background: preview.foreground }} />
        <div style={{ background: preview.secondary }} />
        <div style={{ background: preview.tertiary }} />
      </div>
    </button>
  );
};
