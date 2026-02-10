
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
        },
        // Обратная совместимость
        oss: {
          red: "#1565C0",
          dark: "#0A1628",
        },
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, #0C2340 0%, #1565C0 50%, #1E88E5 100%)',
        'gradient-hero': 'linear-gradient(180deg, #0C2340 0%, #1565C0 60%, #42A5F5 100%)',
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('light', '.light &');
    }),
  ],
};
