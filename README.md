# SooThing 舒室家居

SooThing 是以 Vue 3 前端練習為目標所製作的傢俱電商網站，僅作個人練習，無商業用途。

### Demo
https://zeroo015.github.io/Furniture-ecommerce/


## 主要功能

### 前台
- 商品：篩選 / 排序 / 排列切換 / 相似推薦 / 瀏覽記錄
- 購物車：新增 / 刪除 / 編輯數量 / 套用優惠券 / 資料驗證 / 結帳
- 促銷倒數：倒數計時器 / 彈出視窗(含隨機推薦商品) / 置頂廣告條
- 追蹤清單
- 全站搜尋：搜尋 / 熱門關鍵字
- 空間靈感：情境推薦 / 商品瀑布流
- FAQ

### 後台
- 管理者登入 / 登出、驗證登入狀態
- 後台管理：商品(含多圖上傳) / 訂單 / 優惠券


## 技術與套件

### 主要技術
- Vue with Options API
- Vue CLI 5
- VueRouter
- Pinia
- JavaScript(ES6等)
- Axios
- RWD
- Bootstrap 5
- SCSS
- ESlint(Standard)

### Plugin 套件
- [VueRouter](https://router.vuejs.org/) 路由設置
- [Vue-axios](https://github.com/imcvampire/vue-axios) API 串接
- [Pinia](https://pinia.vuejs.org/) 狀態管理
- [Vee-validate/zod](https://vee-validate.logaretm.com/v4/integrations/zod-schema-validation/) 表單驗證
- [Vue-loading-overlay](https://www.npmjs.com/package/vue-loading-overlay) 讀取效果
- [Swiper](https://swiperjs.com/) 輪播動態
- [Bootstrap Icons](https://icons.getbootstrap.com/) 圖示庫


## Project setup
```
npm install
```

Having the upstream dependency conflict, retry this command with
```
npm install --legacy-peer-deps
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
