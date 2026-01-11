/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: "#6366F1",   // indigo-500
      secondary: "#EC4899", // pink-500
      accent: "#22D3EE",    // cyan-400
      },
    },
  },
  plugins: [],
}


