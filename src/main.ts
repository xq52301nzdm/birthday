import { createApp } from 'vue'
// import './style.css'
import './mobileStyle.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Router from './router/index'
import { createPinia } from 'pinia'
// import './theme-dark.scss'
// import './theme-light.scss'
import 'vant/lib/index.css';
import VantUI from 'vant'

const app = createApp(App)
const pinia = createPinia()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(pinia).use(ElementPlus).use(VantUI).use(Router).mount('#app')