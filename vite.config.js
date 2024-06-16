import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // '/api/user' : "", //"https://hello.zero65.in"
      '/api' : { target: "https://readme-37zstzcle-jai-guptas-projects.vercel.app", rewrite: path => path.replace('/api/', '/') },
    }
  }
})
