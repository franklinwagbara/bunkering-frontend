/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#074287",
        primary_accent: "#92D4FA",
      },
      width: {
        side_nav: "20rem",
      },

      height: {
        card_area: "23.5rem",
        card_area_lg: "60rem",
      },

      margin: {
        content_mt: "5rem",
      },

      fontFamily: {
        sans: [
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
};
