/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        laptop: "640px",
        se: "380px",
      },
      colors: {
        "chill-violet": "#5B507A",
        "chill-blue": "#6F85AE",
      },
      fontSize: {
        se: "1.1rem",
      },
    },
  },
  plugins: [],
};
