/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        laptop: "1025px",
      },
      colors: {
        "chill-violet": "#5B507A",
        "chill-blue": "#6F85AE",
      },
      fontSize: {
        sml: "1.5vw",
        mdl: "2.1vw",
        lgl: "3.0vw",
        md: "3.2vw",
        lg: "4.5vw",
        xl: "8vw",
      },
    },
  },
  plugins: [],
};
