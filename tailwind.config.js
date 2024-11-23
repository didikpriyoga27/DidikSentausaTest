const {default: colors} = require('./src/shared/utils/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        regular: 'Raleway-Regular',
        bold: 'Raleway-Bold',
        semibold: 'Raleway-SemiBold',
      },
    },
  },
  plugins: [],
};
