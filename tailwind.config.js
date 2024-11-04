/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./screens/*.{html,js}",
    "./help/*.{html,js}",
    "index.html",
    "main.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
