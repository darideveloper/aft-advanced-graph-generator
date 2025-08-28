/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    "bg-tech-red",
    "bg-tech-green",
    "bg-tech-blue",
    "text-tech-red",
    "text-tech-green",
    "text-tech-blue",
    "border-tech-red",
    "border-tech-green",
    "border-tech-blue",
  ],
  theme: {
    extend: {
      colors: {
        'tech-red': '#fcc47e',
        'tech-green': '#c0d2cc',
        'tech-blue': '#123c55',
      }
    },
  },
  plugins: [],
}
