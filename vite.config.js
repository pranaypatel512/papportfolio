import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-three': ['three'],
          'vendor-r3f': [
            '@react-three/fiber',
            '@react-three/drei',
          ],
          'vendor-postfx': [
            '@react-three/postprocessing',
            'postprocessing',
          ],
        },
      },
    },
  },
})
