import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'


// https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
export default defineConfig({
  plugins: [vue(),UnoCSS()],
  resolve: {
    alias: { "@": "/src" },
  },
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "https://www.zhihu.com",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});