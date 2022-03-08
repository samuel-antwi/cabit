/* eslint-disable no-undef */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "at-primary": "#f9c61c",
        "at-secondary": "#560DF8",
        "at-dark-bg": "#37333b",
        "at-dark-input": "#011E26",
        "at-dark-primary": "hsl(193, 95%, 8%)",
        "at-dark-secondary": "#022A35",
      },
      fontFamily: {
        futura: ["Futura", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  daisyui: {
    themes: false,
  },
}
