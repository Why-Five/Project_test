import { createApp } from 'vue'
import './style.css'
import 'virtual:uno.css'
import App from './App.vue'
import router from './router/index'
import i18nPlugin from "./plugins/i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "ja", // 本地化的 Vue 应用程序的语言
  fallbackLocale: "zh-CN", // 找不到翻译 API 中指定的密钥资源时要回退到的语言
  messages,
});

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(i18nPlugin)
app.mount('#app')
