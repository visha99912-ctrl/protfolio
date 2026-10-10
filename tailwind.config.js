/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F3",
        ink: "#111111",
        mango: "#F4B942",
        mangoDim: "#E0A830",
      },
      fontFamily: {
        display: ['"Clash Display"', '"Cabinet Grotesk"', '"Neue Montreal"', "sans-serif"],
        sans: ['"General Sans"', '"Satoshi"', '"Inter"', "sans-serif"],
        body: ['"Inter"', '"Switzer"', '"Manrope"', "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
    },
  },
  plugins: [],
};
