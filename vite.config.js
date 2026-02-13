import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 1234,
    open: true,
    proxy: {
      // 将所有以 /api 开头的请求转发到目标服务器
      '/api': {
        target: 'https://sunsetbot.top/',
        changeOrigin: true,
        // 路径重写：把 /api/detailed 变成 /detailed
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
