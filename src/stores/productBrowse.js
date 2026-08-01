import axios from 'axios'
import router from '@/router'
import { defineStore } from 'pinia'
import statusStore from './statusStore'

const status = statusStore()
export const useBrowseLogStore = defineStore('productBrowse', {
  state: () => ({
    product: {},
    historyProducts: []
  }),
  actions: {
    // 前往單一商品頁
    goProduct(id) {
      this.product = {} // 避免短暫顯示上一個商品
      router.push(`/product/${id}`)
    },
    // 取得單一商品
    getPDDetail(id) {
      status.isLoading = true
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/product/${id}` // 取得單一商品 api
      axios.get(api)
        .then((res) => {
          console.log(res.data)
          this.product = res.data.product
          this.recordBrowsing(res.data.product)
          status.isLoading = false
        }).catch((err) => {
          console.log(err.response.data)
          status.isLoading = false
        })
    },
    // 瀏覽紀錄更新 (1)排除重複的商品 (2)寫入目前瀏覽
    recordBrowsing(data) {
      this.historyProducts = this.historyProducts.filter(item => item.id !== data.id)
      this.historyProducts.unshift(data) // 寫入第一筆資料
    }
  }
})

// 監聽 historyProducts 最多八筆資料
const store = useBrowseLogStore()
store.$subscribe((mutation, state) => {
  if (state.historyProducts.length > 9) {
    state.historyProducts.pop() // 刪除最後一筆資料
  }
})
