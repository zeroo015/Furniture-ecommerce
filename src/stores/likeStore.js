import { defineStore } from 'pinia'
import statusStore from './statusStore'

const status = statusStore()
export default defineStore('likeStore', {
  state: () => ({
    likeList: [] // 追蹤 id
  }),
  getters: {
    isLike() {
      return (id) => {
        return this.likeList.filter((item) => item === id).length >= 1
      }
    }
  },
  actions: {
    // 取得追蹤清單
    getLikes() {
      this.likeList = JSON.parse(localStorage.getItem('storageId')) || [] // JSON 格式轉回程式語言
    },
    // 切換追蹤狀態：使用單一陣列儲存多筆資料，針對陣列新增刪減清單，再透過 localStorage.setItem 寫入同一個 key 覆蓋舊資料
    toggleLike(id) {
      const likeItem = this.likeList.some((item) => item === id) // some 回傳布林值
      if (!likeItem) {
        this.likeList.push(id)
        const res = {
          data: { success: true }
        }
        status.msgState(res, '加入追蹤')
      } else {
        this.likeList = this.likeList.filter((item) => item !== id) // 篩掉當前對象
        const res = {
          data: { success: true }
        }
        status.msgState(res, '移除追蹤')
      }
      localStorage.setItem('storageId', JSON.stringify(this.likeList)) // setItem(key 自定義名稱, JSON 格式資料)
    },
    // 清空追蹤清單
    clearLikeList() {
      if (confirm('確定清空追蹤清單?')) {
        localStorage.removeItem('storageId') // 刪除單項
        // localStorage.clear() // 清空所有 localStorage
        this.getLikes()
        const res = {
          data: { success: true }
        }
        status.msgState(res, '清空追蹤清單')
      }
    }
  }
})
