/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: '#BDBC31',
        dark: '#263238',
        cream: '#FFFEF6',
      },
      boxShadow: {
        ripples:
          '0 0 0 20px rgba(32, 190, 121, 0.2), 0 0 0 40px rgba(32, 190, 121, 0.1), 0 0 0 60px rgba(32, 190, 121, 0.05)',
      },
    },
  },
  plugins: [],
}
