import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Vercel 배포를 위해 base 설정을 제거하거나 '/'로 변경
  base: '/', 
  
  plugins: [
    vue(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})