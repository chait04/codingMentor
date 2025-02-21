/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#f2fbf9',
          100: '#d3f4ed',
          200: '#a7e9db',
          300: '#74d4c0',
          400: '#48bca6',
          500: '#2c9f8a',
          600: '#208070',
          700: '#1d665b',
          800: '#1b5149',
          900: '#1a433d',
        },
        pastel: {
          pink: '#ffd6e0',
          beige: '#f5e6d3',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
      },
    },
  },
  plugins: [],
};