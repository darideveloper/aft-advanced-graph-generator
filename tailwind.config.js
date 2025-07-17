/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'tech-red': '#fcc47e',
        'tech-green': '#77d9b8',
        'tech-blue': '#123c55',
      }
    },
  },
  plugins: [],
}