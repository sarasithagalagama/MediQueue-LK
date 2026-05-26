/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        clinic: {
          50: "#eefbf8",
          100: "#d3f5ee",
          200: "#a7ebdb",
          300: "#6ed9c2",
          400: "#33c6a4",
          500: "#16a085",
          600: "#11836d",
          700: "#0f6c5a",
          800: "#0f584b",
          900: "#0e4a40",
        },
      },
    },
  },
  plugins: [],
};
