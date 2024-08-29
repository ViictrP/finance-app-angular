/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
