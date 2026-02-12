
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Nasalization', 'Arial Black', 'sans-serif'],
        'body': ['Ubuntu', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        imo: {
          /* Брендбук (#005A7F, #00B09C, #00A2B1, #0081B4, #E6E1DE, #00BB04, #00A3D7) → неон */
          deep: "#051A24",       // тёмный фон (от #005A7F)
          navy: "#0A2E3D",       // тёмно-бирюзовый (от #005A7F)
          ocean: "#0081B4",      // основной синий брендбук
          wave: "#00A3D7",       // яркий синий брендбук
          sky: "#00E5FF",        // неон-циан (от #00A2B1)
          foam: "#00FFE0",       // неон-бирюза (от #00B09C)
          sand: "#E6E1DE",       // светлый брендбук
          coral: "#00B09C",      // бирюза (CTA)
          teal: "#00A2B1",       // голубой-зелёный
          green: "#00FF41",      // неон-зелёный (от #00BB04)
          neon: "#00FFE0",       // основной неон
          'neon-cyan': "#00E5FF",
          'neon-blue': "#00D4FF",
          'neon-green': "#00FF41",
        },
      },
      boxShadow: {
        'brutal': '4px 4px 0 rgba(0, 255, 224, 0.4)',
        'brutal-sm': '3px 3px 0 rgba(0, 255, 224, 0.4)',
        'brutal-white': '4px 4px 0 rgba(255, 255, 255, 0.2)',
        'brutal-coral': '4px 4px 0 rgba(0, 176, 156, 0.5)',
        'brutal-teal': '4px 4px 0 rgba(0, 162, 177, 0.4)',
        'neon-glow': '0 0 20px rgba(0, 255, 224, 0.35), 0 0 40px rgba(0, 255, 224, 0.15)',
        'neon-glow-sm': '0 0 10px rgba(0, 255, 224, 0.25)',
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, #0A2E3D 0%, #0081B4 50%, #00A3D7 100%)',
        'gradient-hero': 'linear-gradient(180deg, #051A24 0%, #0081B4 40%, #00A3D7 100%)',
        'gradient-accent': 'linear-gradient(90deg, #00B09C 0%, #00FFE0 50%, #00E5FF 100%)',
      },
      borderRadius: {
        'brutal': '0',
        'brutal-tl': '1.5rem 0 0 0',
        'brutal-br': '0 0 1.5rem 0',
      },
    },
  },
  plugins: [
    plugin(function({ addVariant, addUtilities }) {
      addVariant('light', '.light &');
      addUtilities({
        '.brutal-border': {
          border: '2px solid rgba(255, 255, 255, 0.15)',
        },
        '.brutal-border-wave': {
          border: '2px solid rgba(0, 255, 224, 0.5)',
        },
        '.brutal-border-coral': {
          border: '2px solid rgba(255, 112, 67, 0.4)',
        },
      });
    }),
  ],
};
