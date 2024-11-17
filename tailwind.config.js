/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#003545',
        secondary: '#00454A',
        tertiary: '#3C6562',
        accent: '#F4DE34',
      },
    },
  },
  plugins: [],
};
