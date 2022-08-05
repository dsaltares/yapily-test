/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontWeight: {
      normal: 400,
      bold: 700,
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#9600ff',
        secondary: '#00ffb1',
      },
    },
  },
  plugins: [],
};
