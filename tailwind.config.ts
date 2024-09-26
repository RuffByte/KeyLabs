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
        accent: 'hsl(var(--accent))',
        'primary-accent': 'hsl(var(--primary-accent))',
        secondary: 'hsl(var(--secondary))',
        highlight: 'hsl(var(--highlight))',
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
      },
      fontFamily: {
        kollektif: ['var(--font-kollektic)'],
      },
      screens: {
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
