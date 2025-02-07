/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'], // Scans all HTML & TS files in src/
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',     // Dark blue accent
        secondary: '#374151',   // Dark grey
        accent: '#1e40af',      // Deeper blue accent
        light: '#f9fafb',       // Very light/white tone
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
};
