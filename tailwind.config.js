/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navModalOpenBg: "#1c1c1c30",
      },
      boxShadow: {
        navModalOpenShadow:
          "0px 100px 80px rgba(184, 184, 184, 0.07), 0px 25.8162px 19px 4px rgba(178, 178, 178, 0.0456112), 0px 7.779px 7.30492px rgba(0, 0, 0, 0.035), 0px 1.48838px 2.0843px rgba(0, 0, 0, 0.0243888)",
      },
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
