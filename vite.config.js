import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: './build',
    sourcemap: false
  },
  base: '',
  server: {
    port: 8080
  }
})
