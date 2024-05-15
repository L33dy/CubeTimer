/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'poetsen': 'Poetsen One',
        'roboto-mono': ['Roboto Mono', 'monospace']
      }
    }
  },
  plugins: []
};