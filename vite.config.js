import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve('./src/app'),
      '@assets': path.resolve('./src/assets'),
      '@entities': path.resolve('./src/entities'),
      '@features': path.resolve('./src/features'),
      '@pages': path.resolve('./src/pages'),
      '@shared': path.resolve('./src/shared'),
      '@widgets': path.resolve('./src/widgets'),
    }
  }
})
