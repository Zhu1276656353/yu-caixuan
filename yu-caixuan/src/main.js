import { createApp } from 'vue'
import { createPinia } from 'pinia'
//持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import App from './App.vue'
import router from './router'

const app = createApp(App)
/**
 * 使用pinia
 */ 
const pinia = createPinia()
 // 使用持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
/**
 * 使用路由
 */
app.use(router)
/**
 * 使用element-plus
 */
app.use(ElementPlus);
// 使用element-plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.mount('#app')
