import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is the GitHub Pages sub-path in production (https://ideoideis.github.io/pookie/),
// and '/' locally so `npm run dev` works at localhost:5173.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/pookie/' : '/',
  plugins: [react()],
}))
