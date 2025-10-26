/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // optional semantic aliases to keep us honest about monochrome
        ink: "#000000",
        paper: "#FFFFFF",
        ash: {
          200: "#E5E5E5",
          400: "#A3A3A3",
          700: "#3D3D3D",
          900: "#0A0A0A",
        },
      },
      fontFamily: {
        // swap to your preferred grotesk later
        sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};
