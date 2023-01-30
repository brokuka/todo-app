/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "16px",
        screens: {
          md: "768px",
        },
      },
      colors: {
        blackish: "rgba(0, 0, 0, 0.04)",
        dark: "#0e141b",
      },
      animation: {
        scaleIn: "normal",
        scaleOut: "normal",
      },
    },
  },
  plugins: [],
};
