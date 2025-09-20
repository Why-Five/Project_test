import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import path from 'node:path'
import VueI18n from "@intlify/unplugin-vue-i18n/vite";


export default defineConfig({
  plugins: [vue(), vueJsx(), VueI18n({
    runtimeOnly: true,
    compositionOnly: true,
    fullInstall: true,
    include: [path.resolve(__dirname, "locales/**")],
  }), UnoCSS()],
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
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
} as any)