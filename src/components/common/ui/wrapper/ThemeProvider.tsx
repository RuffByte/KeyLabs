'use client';

import React, { useInsertionEffect } from 'react';
import { create } from 'zustand';

export type ThemeType = {
  theme: string;
  handleSetTheme: (theme: string) => void;
};

export const useTheme = create<ThemeType>()((set) => ({
  theme: localStorage.getItem('theme') || 'default',
  handleSetTheme: (theme: string) =>
    set(() => {
      localStorage.setItem('theme', theme);
      return { theme };
    }),
}));

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  useInsertionEffect(() => {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `/themes/${theme}.css`;
    document.head.appendChild(link);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeWrapper;
