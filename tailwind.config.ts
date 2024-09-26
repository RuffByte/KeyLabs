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
        background: 'var(--background)',
        accent: 'var(--accent)',
        'primary-accent': 'var(--primary-accent)',
        secondary: 'var(--secondary)',
        highlight: 'var(--highlight)',
        foreground: 'var(--foreground)',
        input: 'var(--input)',
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
