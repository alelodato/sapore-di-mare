/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C6A96B',
          light: '#A88F5A',
          dark: '#7A6440',
        },
        noir: {
          DEFAULT: '#0F1C2E',
          soft: '#1C2E4A',
          mid: '#162539',
        },
        cream: {
          DEFAULT: '#F4F1EC',
          soft: '#D9D2C5',
        },
        sea: '#5F8FA6',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      fontSize: {
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
