/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        yeseva: ["Yeseva One", "sans-serif"],
      },
      colors: {
        primary: "#FF6B00",
      },
    },
  },
  plugins: [],
};
