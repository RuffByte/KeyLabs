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
        'background-dark': 'var(--background-dark)',
        'background-darker': 'var(--background-darker)',
        'primary-accent': 'var(--primary-accent)',
        'secondary-blue': 'var(--secondary-blue)',
        'highlight-lavender': 'var(--highlight-lavender)',
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
