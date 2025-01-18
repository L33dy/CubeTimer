import plugin from 'tailwindcss/plugin'
import { iconsPlugin, dynamicIconsPlugin } from '@egoist/tailwindcss-icons'
import colors from 'tailwindcss/colors.js'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  safelist: [
    'i-[mdi--stopwatch]',
    'i-[f7--hourglass-bottomhalf-fill]',
    'i-[f7--chart-pie-fill]',
    'i-[mingcute--settings-3-fill]',
    'i-[ri--add-fill]',
    'i-[ri--arrow-up-fill]',
    'i-[ri--settings-fill]'
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px',
      },
      colors: {
        primary: colors.violet,
        'background': 'var(--background)',
        'text': 'var(--text)',
        'main': 'var(--main)',
      },
      fontFamily: {
        'sans': ['Open Sans', 'serif'],
        'mono': ['Roboto Mono', 'serif'],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
    }),
    iconsPlugin(),
    dynamicIconsPlugin()
  ],
}
