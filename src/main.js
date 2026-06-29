import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

// vue-loading-overlay 套件 (讀取視覺效果)
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import App from './App.vue'
import router from './router'
import { currency, date } from '@/methods/filters.js'

const pinia = createPinia()
const app = createApp(App)
app.use(VueAxios, axios)
app.use(pinia)
app.use(router)
app.component('VueLoading', Loading) // 全域註冊元件
app.config.globalProperties.$filters = { currency, date } // 全域註冊轉換格式 methods，$filters 為自定義名稱

app.mount('#app')
