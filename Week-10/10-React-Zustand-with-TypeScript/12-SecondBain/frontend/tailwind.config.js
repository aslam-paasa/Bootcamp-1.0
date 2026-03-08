/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  /**
   * Designing Custom Colors: 
  */
  theme: {
    extend: {
      colors: {
        gray: {
          50: "rgba(255, 255, 255, 0.8)",
          100: "#eeeeef",
          200: "#e6e9ed",
          600: "#95989c"
        },
        purple: {
          200: "#d9ddee",  // Background of Secondary Button
          500: "#9492db",  // Text of Secondary Button
          600: "#7164c0"   // Background of Primary Button
        }
      }
    },
  },
  plugins: [],
}