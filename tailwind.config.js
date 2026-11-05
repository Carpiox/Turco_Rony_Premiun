/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0e0907',
        coal: '#1a110e',
        ash: '#2a1c17',
        ember: { DEFAULT: '#c2301f', deep: '#8f1d12', glow: '#ef5b3a' },
        ocre: { DEFAULT: '#d9a03a', soft: '#f0c777', deep: '#a8731c' },
        crema: '#f7ecd9',
        sand: '#cdb99a',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"DM Sans Variable"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(22px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: { 'fade-up': 'fade-up .9s cubic-bezier(.2,.7,.2,1) both' },
    },
  },
  plugins: [],
}
