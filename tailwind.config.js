/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/App.vue",
    "./src/pages/**/*.vue",
    "./src/components/**/*.vue",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "light-bg": "#E3EAF6",
        "component-bg": "#AFCCF4",
        "chat-bg": "#2D6BE0",
        "black-text": "#301F23",
        "brown-text": "#A4A1A4",
        "icon-blue": "#1842CA",
        "icon-brown": "#8D83A8"
      },
      screens: {
        "md": "900px"
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}

