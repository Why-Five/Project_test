import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'node:path'
import VueI18n from "@intlify/unplugin-vue-i18n/vite";


export default defineConfig({  plugins: [vue(),  VueI18n({
    runtimeOnly: true,
    compositionOnly: true,
    fullInstall: true,
    include: [path.resolve(__dirname, "locales/**")],
  }),UnoCSS()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://www.zhihu.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})