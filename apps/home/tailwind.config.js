/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        "2B": "#2B2B2B",
        "fresh-salmon": "#FC6F68",
        "glossy-coral": "#FB8763",
        "sea-serpent": "#4BC7CF",
        "water-blue": "#007577",
      },
    },
  },
  plugins: [],
};
