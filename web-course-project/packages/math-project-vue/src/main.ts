import { createApp } from 'vue'
import './style.css'
import 'virtual:uno.css'
import App from './App.vue'
import router from './router/index'
import i18nPlugin from "./plugins/i18n";

const app = createApp(App)
app.use(router)
app.use(i18nPlugin)
app.mount('#app')
