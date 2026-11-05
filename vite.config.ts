import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages sirve el repo en /<nombre-repo>/. Con dominio propio: VITE_BASE=/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/Turco_Rony_Premiun/',
  plugins: [react()],
  build: { target: 'es2020', chunkSizeWarningLimit: 900 },
})
