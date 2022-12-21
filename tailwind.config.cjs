const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-light": "#a7f3d0",
        primary: "#34d399",
        "primary-dark": "#064e3b",
        secondary: "#fb7185",
        "secondary-dark": "#881337",
        "secondary-light": "#fecdd3",
        "base-dark": "#18181b",
        "base-dark-200": "#27272a",
        "base-dark-300": "#3f3f46",
        "base-dark-400": "#737373",
        "base-light": "#fafafa",
        "base-light-200": "#f4f4f5",
        "base-light-300": "#e4e4e7",
        error: "#f87171",
        "error-dark": "#7f1d1d",
        warning: "#fbbf24",
        "warning-dark": "#78350f",
        info: "#38bdf8",
        "info-dark": "#0c4a6e",
      },
      fontFamily: {
        sans: ["Inter Tight", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        // opacity fade animation
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fade: "fade 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
