
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
          deep: "#0A1628",       // глубокий тёмно-синий (фон)
          navy: "#0C2340",       // тёмно-синий
          ocean: "#1565C0",      // основной синий океан
          wave: "#1E88E5",       // волна (акцент)
          sky: "#42A5F5",        // голубой
          foam: "#90CAF9",       // пена (светлый)
          sand: "#FFF8E1",       // песок (тёплый акцент)
          coral: "#FF7043",      // коралл (акцент CTA)
          teal: "#00897B",       // бирюзовый (для карточек)
          green: "#2E7D32",      // зелёный (экология)
          neon: "#00FFE0",       // неоновый циан
          magenta: "#FF00FF",    // неоновый маджента (глитч)
          lime: "#CCFF00",       // яркий лайм (CTA)
        },
      },
      boxShadow: {
        'brutal': '4px 4px 0 rgba(0, 255, 224, 0.6)',
        'brutal-sm': '3px 3px 0 rgba(0, 255, 224, 0.6)',
        'brutal-white': '4px 4px 0 rgba(255, 255, 255, 0.2)',
        'brutal-coral': '4px 4px 0 rgba(255, 112, 67, 0.6)',
        'brutal-lime': '4px 4px 0 rgba(204, 255, 0, 0.6)',
        'neon-glow': '0 0 20px rgba(0, 255, 224, 0.3), 0 0 40px rgba(0, 255, 224, 0.1)',
        'neon-glow-sm': '0 0 10px rgba(0, 255, 224, 0.2)',
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, #0C2340 0%, #1565C0 50%, #1E88E5 100%)',
        'gradient-hero': 'linear-gradient(180deg, #050d1a 0%, #0C2340 40%, #1565C0 100%)',
        'gradient-neon': 'linear-gradient(135deg, #00FFE0 0%, #42A5F5 50%, #FF00FF 100%)',
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
        '.brutal-border-neon': {
          border: '2px solid rgba(0, 255, 224, 0.4)',
        },
        '.brutal-border-coral': {
          border: '2px solid rgba(255, 112, 67, 0.4)',
        },
      });
    }),
  ],
};
