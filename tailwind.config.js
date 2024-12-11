/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        primary: {
          DEFAULT: '#C8102E',
          light: '#FF4444',
          dark: '#C20909'
        },
        secondary: {
          DEFAULT: '#4A4A4A',
          light: '#6A6A6A'
        }
      }
    },
  },
  plugins: [],
}