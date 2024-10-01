import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        secondary: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--foreground))',
        tertiary: 'hsl(var(--tertiary))',
        input: 'hsl(var(--tertiary))',
        hover: 'hsl(var(--hover))',
      },
      fontFamily: {
        kollektif: ['var(--font-kollektic)'],
      },
      screens: {
        desktop: '1280px',
      },
      width: {
        desktop: '1280px',
      },
      minWidth: {
        desktop: '1280px',
      },
      borderRadius: {
        input: '8px',
      },
      height: {
        input: '40px',
      },
    },
  },
  plugins: [],
};

export default config;
