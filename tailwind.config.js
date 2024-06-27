/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './node_modules/@onrewind/ui/**/*.{js,jsx,ts,tsx}',
    './src/layout/**/*.tsx',
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx',
  ],
  presets: [require('@onrewind/ui/lib/origins.preset')],
  theme: {
    fontFamily: {
      title: ['graphik-regular', ...defaultTheme.fontFamily.sans],
      body: ['Headline', ...defaultTheme.fontFamily.sans],
      sans: ['graphik-bold', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: '#f16305',
        secondary: 'var(--secondary)',
        background: '#010D19',
        form: '#696969',
        facebook: '#1B74E4',
        error: '#ef4444',
        slate: {
          50: '#fff8ec',
          100: '#ffefd4',
          200: '#ffdca7',
          300: '#ffc270',
          400: '#ff9c36',
          500: '#ff7f0f',
          600: '#f16305',
          700: '#c84a06',
          800: '#9e3a0e',
          900: '#7f310f',
          950: '#451705',
        },
      },

      width: {
        'min-1080': 'min(100%, 1080px)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
