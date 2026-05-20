/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#0070F3', // A clinic-friendly blue
        accent: '#00C853', // A vibrant green for success/action
        wellness: '#FFE0B2', // A soft, warm tone for well-being
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}