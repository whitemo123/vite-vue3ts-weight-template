import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacyPlugin from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // jsx
    vueJsx(),
    // 低版本兼容
    legacyPlugin({
      targets: ['defaults', 'chrome > 55', 'Android >= 4.4'],
      additionalLegacyPolyfills:['regenerator-runtime/runtime'],
      modernPolyfills: true
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "0.0.0.0",
    port: 9999,
    proxy: {
      "/api": {
        target: "https://www.baidu.com",
        changeOrigin: true,
        ws: true
      }
    }
  }
})
