const palette = require('./src/constants/palette');

// Each color gets a light value and a `dark-` twin, used as e.g. `bg-bg dark:bg-dark-bg`.
const colors = {};
for (const [name, value] of Object.entries(palette.light)) colors[name] = value;
for (const [name, value] of Object.entries(palette.dark)) colors[`dark-${name}`] = value;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: { colors },
  },
  plugins: [],
};
