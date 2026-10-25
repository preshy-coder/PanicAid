/**
 * PanicAid colors — the ONE place to change the app's look.
 * Used by tailwind.config.js (className styling) and by src/constants/theme.ts (JS styling).
 * Keep everything soft and low-contrast-on-the-eyes, but readable.
 */
module.exports = {
  light: {
    bg: '#F4F2EC', // warm off-white page background
    surface: '#E6EBE7', // cards / soft panels
    ink: '#16262B', // main text
    muted: '#5B6B6F', // secondary text
    accent: '#1D5560', // deep teal: buttons, highlights
    accentSoft: '#B8D4D2', // breathing circle, filled dots
    onAccent: '#F4F2EC', // text on teal buttons
  },
  dark: {
    bg: '#0E1A1E',
    surface: '#17262B',
    ink: '#E9EEEC',
    muted: '#9AAAAD',
    accent: '#7FB8B5',
    accentSoft: '#2A5A5F',
    onAccent: '#0E1A1E',
  },
};
