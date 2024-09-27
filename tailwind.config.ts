import type { Config } from 'tailwindcss'

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
        input: 'hsl(var(--tertiary))',
      },
      fontFamily: {
        kollektif: ['var(--font-kollektic)'],
      },
      screens: {
        desktop: '1440px',
      },
      width: {
        desktop: '1440px',
      },
      minWidth: {
        desktop: '1440px',
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
}

export default config
