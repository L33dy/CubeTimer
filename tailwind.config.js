import plugin from "tailwindcss/plugin";
import { iconsPlugin, dynamicIconsPlugin } from "@egoist/tailwindcss-icons";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
      './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'main': 'minmax(300px, 350px) auto'
      }
    }
  },
  plugins: [
    plugin(function({addVariant}) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }),
      iconsPlugin(),
      dynamicIconsPlugin(),
  ],
};
