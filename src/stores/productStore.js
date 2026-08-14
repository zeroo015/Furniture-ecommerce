import axios from 'axios'
import router from '@/router'
import { defineStore } from 'pinia'
import statusStore from './statusStore'

const status = statusStore()
export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    pagination: {
      perpage: 20, // 每頁的資料筆數
      total_pages: 1,
      current_page: 1,
      has_pre: false,
      has_next: false
    },
    order: 'default',
    filterObj: {
      keyword: '',
      category: '',
      colors: [],
      material: [],
      style: [],
      priceMin: null,
      priceMax: null
    },
    filterOpts: {
      category: ['椅', '沙發', '桌', '燈', '櫃'],
      style: ['北歐', '日系簡約', '現代簡約', '工業', '侘寂', '美式鄉村', '輕奢'],
      material: ['布', '皮', '木', '金屬', '塑膠', '藤編', '玻璃', '大理石'],
      colors: ['黑', '白', '米', '灰', '棕', '卡其', '綠', '藍', '橘', '紅'],
      space: ['客廳', '餐廳', '臥室', '書房', '毛孩', '工作空間']
    }
  }),
  getters: {
    // 篩選商品：(1)未輸入條件表示全選 (2)符合選擇條件
    filterData: (state) => {
      return state.products.filter((item) => {
        const matchKeyword = !state.filterObj.keyword || item.title.match(state.filterObj.keyword.trim())
        const matchCategory = state.filterObj.category === 'all' || item.category === state.filterObj.category
        // 多選符合其一【＊】多選欄位非必填，若 item.filters 可能因沒資料造成 undefind.some() 而報錯
        const matchColor = state.filterObj.colors.length === 0 || (item.colors && state.filterObj.colors.some(option => item.colors.includes(option)))
        const matchMaterial = state.filterObj.material.length === 0 || (item.material && state.filterObj.material.some(option => item.material.includes(option)))
        const matchStyle = state.filterObj.style.length === 0 || (item.style && state.filterObj.style.some(option => item.style.includes(option)))
        const matchPriceMin = state.filterObj.priceMin === null || state.filterObj.priceMin === '' || item.price >= Number(state.filterObj.priceMin)
        const matchPriceMax = state.filterObj.priceMax === null || state.filterObj.priceMax === '' || item.price <= Number(state.filterObj.priceMax)
        // 符合上述所有條件
        return matchKeyword && matchCategory && matchColor && matchMaterial && matchStyle && matchPriceMin && matchPriceMax
      })
    },
    // 計算篩選條件數量
    filterTotal: (state) => {
      let total
      if (state.filterObj.category === 'all') {
        total = (state.filterObj.colors).length + (state.filterObj.material).length + (state.filterObj.style).length + Number(Boolean(state.filterObj.priceMin)) + Number(Boolean(state.filterObj.priceMin))
      } else {
        total = Number(Boolean(state.filterObj.category)) + (state.filterObj.colors).length + (state.filterObj.material).length + (state.filterObj.style).length + Number(Boolean(state.filterObj.priceMin)) + Number(Boolean(state.filterObj.priceMin))
      }
      return total
    },
    // 排序商品
    sortData(state) {
      const data = [...this.filterData]
      switch (state.order) {
        case 'priceDown':
          return data.sort((a, b) => b.price - a.price)
        case 'priceUp':
          return data.sort((a, b) => a.price - b.price)
        case 'newItem':
          return data.sort((a, b) => {
            const x = a.is_newItem || 0 // 避免 is_newItem 沒有值
            const y = b.is_newItem || 0
            if (x > y) return -1
            if (x > y) return 1 // 正數：前者擺前面
            else return 0
          })
        case 'category':
          return data.sort((a, b) => a.category.localeCompare(b.category))
        default:
          return data
      }
    },
    // 商品分頁
    pageData(state) {
      const start = (state.pagination.current_page - 1) * state.pagination.perpage
      const end = state.pagination.current_page * state.pagination.perpage
      return this.sortData.slice(start, end) // this 不可用箭頭函式【＊】
    }
  },
  actions: {
    getSaleProducts() {
      status.isLoading = true
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/products/all` // 取得所有商品 api
      axios.get(api)
        .then((res) => {
          // console.log(res.data)
          this.products = res.data.products
          if (!this.filterObj.category) {
            this.filterObj.category = 'all' // 避免其他頁頁面跳轉類別條件被覆蓋 >> 若無類別再執行
          }
          this.calcPage()
          this.resetPage() // 確保載入後在第一頁
          status.isLoading = false
        }).catch((err) => {
          console.log(err.response.data)
          status.isLoading = false
        })
    },
    // 計算總頁數
    calcPage() {
      const totalPD = this.filterData.length
      this.pagination.total_pages = Math.ceil(totalPD / this.pagination.perpage) // Math.ceil() 無條件進位 >> 餘數需多一頁顯示
    },
    // 取得是否有前後頁
    getPageStatus() {
      if (this.pagination.current_page > 1) {
        this.pagination.has_pre = true
      } else {
        this.pagination.has_pre = false
      }
      if (this.pagination.current_page !== this.pagination.total_pages) {
        this.pagination.has_next = true
      } else {
        this.pagination.has_next = false
      }
    },
    // 回商品首頁
    goShop() {
      this.clearFilters()
      router.push('/shop')
    },
    // 前往分頁
    goPage(page) {
      // 避免超出邊界頁面
      if (page < 1 || page > this.pagination.total_pages) return
      this.pagination.current_page = page
      this.getPageStatus()
    },
    // 更新排序依據
    sortBy(order) {
      this.order = order
    },
    // 更新篩選依據 - navArea 用
    filterType(type, target) {
      this.clearFilters()
      if (type === 'category') {
        router.push({
          path: '/shop', // 商品頁路徑
          query: { category: target } // 網址會變成 /products?category=electronics
        })
        this.filterObj[type] = target
      }
      if (type === 'keyword') {
        router.push({
          path: '/shop',
          query: { search: target }
        })
        this.filterObj[type] = target
      }
      if (type === 'style') {
        router.push({
          path: '/shop',
          query: { style: target }
        })
        this.filterObj[type].push(target)
      }
    },
    // 篩選條件變動時自動切回第一頁
    resetPage() {
      this.pagination.current_page = 1
      this.getPageStatus()
    },
    // 清除所有篩選條件
    clearFilters() {
      this.filterObj.keyword = ''
      this.filterObj.category = 'all'
      this.filterObj.colors = []
      this.filterObj.material = []
      this.filterObj.style = []
      this.filterObj.priceMin = null
      this.filterObj.priceMax = null
      this.resetPage()
    }
  }
})

// 監聽 filterData >> 當商品被篩選、長度改變時，自動執行 actions 更新 state (相當於 watch)
const store = useProductStore()
store.$subscribe((mutation, state) => {
  // 每當 state 發生改變，就重新計算總頁數並存入 state
  store.calcPage()
  store.getPageStatus()
}, { detached: true }) // detached: true 確保 store 在組件銷毀後依然持續監聽
