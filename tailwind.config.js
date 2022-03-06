/* eslint-disable no-undef */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "at-primary": "#f9c61c",
        "at-dark-bg": "#37333b",
        "at-dark-input": "#282D32",
      },
      fontFamily: {
        futura: ["Futura", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  daisyui: {
    themes: false,
  },
}
