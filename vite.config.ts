import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    // 플러그인 충돌 방지를 위해 vuetify 자동 임포트 제거
  ],
  server: {
    host: '0.0.0.0', // 모든 IP에서 접속 허용 (연결 거부 에러 해결)
    port: 5173,
  }
})