import plugin from "tailwindcss/plugin";
import {join} from 'path';
import {skeleton} from '@skeletonlabs/tw-plugin'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
      './src/**/*.{html,js,svelte,ts}',
      join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
  ],
  theme: {
    extend: {
    }
  },
  plugins: [
    plugin(function({addVariant}) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }),
    skeleton({
      themes: { preset: [ "skeleton" ] }
    })
  ],
};