import type { Config } from "tailwindcss"
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        gray: colors.slate,
        primary: '#7AA2F7',
        background: '#1A2130',
        'primary-dark': '#262C3B'
      },
      typography: (theme: Function) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: `${theme('colors.sky.400')} !important`,
              },
              code: { color: theme('colors.sky.400') },
            },
            h1: {
              fontWeight: '500',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '500',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '400',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              fontWeight: '400',
              color: theme('colors.gray.100'),
            },
            pre: {
              backgroundColor: '#24283b',
            },
            code: {
              color: '#bb9af7',
              backgroundColor: '#24283b',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
