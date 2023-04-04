import { createApp } from 'vue'
import global from './global'

import App from './App.vue'
import "@/config"


const app = createApp(App)
// 注入全局插件
app.use(global)

app.mount('#app')
