/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // paleta del panel impreso del local: rojo, amarillo, negro y crema
        ink: '#14100e',
        coal: '#1f1815',
        ash: '#2c2420',
        ember: { DEFAULT: '#c8202a', deep: '#9c1520', glow: '#ee4650' },
        ocre: { DEFAULT: '#f4c81c', soft: '#f9dc5c', deep: '#b88f00' },
        crema: '#fbf3e4',
        paper: '#fffaf0',
        sand: '#cdb99a',
        smoke: '#6e625a',
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
