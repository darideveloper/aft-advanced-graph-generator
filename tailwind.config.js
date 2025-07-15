/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'tech-red': '#bf4828',
        'tech-green': '#046659',
        'tech-blue': '#2e58a4',
      }
    },
  },
  plugins: [],
}