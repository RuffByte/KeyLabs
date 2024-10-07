'use client';

import React, { useEffect, useInsertionEffect, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { create } from 'zustand';

export type ThemeConfig = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const useTheme = create<ThemeConfig>()((set) => ({
  theme: 'default',
  setTheme: (theme) => set({ theme }),
}));

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  if (theme) {
    return theme;
  } else {
    return 'default';
  }
};

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('dark_mono');

  useEffect(() => {
    const themePath = `/themes/${theme}.css`;

    const existingLink = document.getElementById('theme-link');
    if (existingLink) {
      existingLink.remove();
    }

    const link = document.createElement('link');
    link.id = 'theme-link';
    link.rel = 'stylesheet';
    link.href = themePath;

    document.head.appendChild(link);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeWrapper;
