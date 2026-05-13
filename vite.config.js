import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // 不设置 COEP/COOP headers，否则会阻止加载 public/ 下的 GLB 文件
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  optimizeDeps: {
    exclude: ['three'],
  },
  build: {
    chunkSizeWarningLimit: 50000,
  },
})
