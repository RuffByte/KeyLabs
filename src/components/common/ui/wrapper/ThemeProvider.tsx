'use client';

import React, { useInsertionEffect } from 'react';
import { create } from 'zustand';

export type ThemeType = {
  theme: string;
  handleSetTheme: (theme: string) => void;
};

export const useTheme = create<ThemeType>()((set) => ({
  theme:
    typeof window !== 'undefined' ? localStorage.getItem('theme')! : 'default',
  handleSetTheme: (theme: string) =>
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
      }
      return { theme };
    }),
}));

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  useInsertionEffect(() => {
    const existingLink = document.querySelector('link[data-theme="dynamic"]');
    let link: HTMLLinkElement;

    if (existingLink) {
      link = existingLink as HTMLLinkElement;
    } else {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.setAttribute('data-theme', 'dynamic');
      document.head.appendChild(link);
    }

    link.href = `/themes/${theme}.css`;
  }, [theme]);

  return <>{children}</>;
};

export default ThemeWrapper;
