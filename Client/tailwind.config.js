/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    extend: {
      colors: {
        "white": "#F1F1F1",
        "warning": "#D84143",
        "gray": "#4D5B60",
        "gray-900": "#121312",
        "greenish-black": "#000501",
        "light-black": "#202120",
        "lightest-green": "#0C6049",
        "light-green": "#12B587",
        "dark-green": "#117056",
        "darkest-green": "#0C6049",
        "light-cyan": "#083B4A",
        "dark-cyan": "#062D38",
        "darkest-cyan": "#031013",
        "blue": "#20bde9",
        "light-blue": "#2288A3",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [],
  },
}