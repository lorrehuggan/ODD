const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-light": "#d2e6db",
        primary: "#4A9C6D",
        "primary-dark": "#244c35",
        secondary: "#fb7185",
        "secondary-dark": "#b83b4f",
        "secondary-light": "#fbb6c2",
        "base-dark": "#18181b",
        "base-dark-200": "#27272a",
        "base-dark-300": "#3f3f46",
        "base-dark-400": "#737373",
        "base-light": "#fafafa",
        "base-light-200": "#f4f4f5",
        "base-light-300": "#e4e4e7",
        error: "#dc2626",
        "error-dark": "#991b1b",
        warning: "#f97316",
        "warning-dark": "#9a3412",
        info: "#22d3ee",
        "info-dark": "#155e75",
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
