/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary" : "#1877F2",
        "primary-light" : "#ffc929",
        "secondary" : "#0A66C2",
        "secondary-light" : "#318515",
        "custom-Blue" : 'rgb(83, 140, 238)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

