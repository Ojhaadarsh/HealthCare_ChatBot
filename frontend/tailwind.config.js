/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        sans: ['"Outfit"', "sans-serif"],
      },
      colors: {
        sage: {
          50: "#f4f7f4",
          100: "#e3ebe3",
          200: "#c7d8c8",
          300: "#9bbb9d",
          400: "#6e9871",
          500: "#4f7c52",
          600: "#3d6240",
          700: "#324f35",
          800: "#2a3f2c",
          900: "#243525",
        },
        cream: {
          50: "#fdfcf8",
          100: "#faf6ec",
          200: "#f3ecd5",
        },
        ink: {
          900: "#1a1a1a",
          700: "#3a3a3a",
          500: "#6a6a6a",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        typing: "typing 1.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        typing: {
          "0%, 60%, 100%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
