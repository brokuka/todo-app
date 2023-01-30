/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
      },
    },
  },
  plugins: [],
};
