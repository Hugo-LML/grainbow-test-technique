/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        red: {
          DEFAULT: '#FF0101',
          dark: '#E60000',
        },
        black: {
          DEFAULT: '#020203',
        },
        gray: {
          DEFAULT: '#FBFBFB',
          medium: '#74798C',
          dark: '#20253A',
        },
      },
    },
  },
  plugins: ['prettier-plugin-tailwind'],
};
