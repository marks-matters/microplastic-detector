/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: ({ opacityVariable, opacityValue }) =>
          `rgba(var(--primary), ${opacityValue ?? `var(${opacityVariable}, 1)`})`,
      },
      borderColor: {
        border: 'var(--border)',
      }
    },
  },
  plugins: [],
}