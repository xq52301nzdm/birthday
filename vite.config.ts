import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/birthday/',
  build: {
    outDir: 'docs',
    assetsDir: './'
  },
  server: {
    host: true,
  },
  plugins: [vue()],
})
