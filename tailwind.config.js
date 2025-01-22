const plugin = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'font-3': ['"SF Pro Display"', 'sans-serif'],
      },
    },
  },
  plugins: [

  ],
}

