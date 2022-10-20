/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');

module.exports = {
  content: ['./src/**/*.{js,jsx}', 'index.html'],
  theme: {
    extend: {
      colors: {
        lisbon: colors.zinc,
        paris: colors.pink,
        parisII: colors.amber,
      },
      screens: {
        xs: '400px'
      }
    },
  },
  plugins: [
    forms
  ],
}
