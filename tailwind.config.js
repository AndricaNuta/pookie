/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Cool / mysterious (early scenes)
        navy: { DEFAULT: '#0b1020', 800: '#161d35', 700: '#1a2342' },
        parchment: { DEFAULT: '#f3ead7', deep: '#e7d9bb' },
        gold: { DEFAULT: '#d9b35b', soft: '#e6c878' },
        candle: '#f0c674',
        wood: { DEFAULT: '#7a5a32', dark: '#4a3720' },
        // Warm / Adriatic (late scenes)
        adriatic: { DEFAULT: '#1B6CA8', light: '#2E96D4' },
        terracotta: '#D8643A',
        coral: '#F0997B',
        ink: '#2a2433',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
