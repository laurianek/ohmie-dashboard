/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx}', 'index.html'],
  theme: {
    extend: {
      colors: {
        lisbon: colors.zinc,
        paris: colors.pink,
        parisII: colors.amber,
      },
    },
  },
  plugins: [],
}
