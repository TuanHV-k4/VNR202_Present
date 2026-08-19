/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          900: '#1a110a',
          800: '#2c1e16',
          700: '#4a3219',
          600: '#8b5a2b',
        },
        gold: {
          500: '#d4af37',
        },
        copper: {
          500: '#e67e22',
        },
        cream: {
          100: '#f5e6d3',
          200: '#c8b39a',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
