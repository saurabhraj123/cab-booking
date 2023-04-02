/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#ffbf00',
        'primary-btn': '#22c55e',
        'primary-btn-hover': '#1B9B4A'
      }
    },
  },
  plugins: [],
}

