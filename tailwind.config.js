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
