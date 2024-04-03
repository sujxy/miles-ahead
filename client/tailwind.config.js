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
        backgroundmain: "#E9C6AC",
        boxborder: "#AE4A11",
      },
      boxes: {
        custom: {
          border: "#AE4A11", // Border color
          borderRadius: "5px", // Border radius
          backgroundColor: "#FFFFFF", // Background color
          margin: "3px",
        },
      },
      placeholdercolor: {
        custom: {
          color: "black",
        },
      },
    },
  },
  plugins: [],
};
