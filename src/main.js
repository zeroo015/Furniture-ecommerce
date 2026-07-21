import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

// vue-loading-overlay 套件 (讀取視覺效果)
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
// vee-validate 套件
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate' // 主套件
import { required, email, min } from '@vee-validate/rules' // 相關規則
import { localize, setLocale } from '@vee-validate/i18n' // 多國語系的功能
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json' // 繁體中文語系檔案

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // 可使用 dataset(data-bs-*)，實體化元件須 (1)個別元件 import bootstrap 元件 (2)全域註冊
import { currency, date } from '@/methods/filters.js'
// vee-validate 設定檔
// 定義驗證規則
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: false // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW') // 設定預設語系

const pinia = createPinia()
const app = createApp(App)
app.use(VueAxios, axios)
app.use(pinia)
app.use(router)
app.component('VueLoading', Loading) // 全域註冊元件
app.config.globalProperties.$filters = { currency, date } // 全域註冊轉換格式 methods，$filters 為自定義名稱
// 全域註冊 vee-validate 元件 (在 createApp 後方、mount 前方)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
