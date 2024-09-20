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
        'background-dark': '#282A36',
        'background-darker': '#20222C',
        'primary-accent': '#9D7CCF',
        'secondary-blue': '#6272A4',
        'highlight-lavender': '#9D7CCF',
      },
    },
  },
  plugins: [],
};
export default config;
