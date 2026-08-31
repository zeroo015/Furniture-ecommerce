// 匯入 Pinia 方法
import { defineStore } from 'pinia'

// defineStore('自定義名稱', 參數)
export default defineStore('countdown', {
  state: () => ({
    // 1. 設定未來的目標時間
    targetDate: new Date('2026-09-15T23:59:59').getTime(),
    // 2. 存放與目標相差的總毫秒數
    remainingTime: 0,
    // 3. 全局唯一計時器
    timer: null
  }),
  getters: {
    // 判斷是否已經活動結束
    isEnded() {
      return this.remainingTime <= 0
    },
    // 轉換為總秒數
    totalSeconds() {
      return Math.max(0, Math.floor(this.remainingTime / 1000))
    },
    // 計算天、時、分、秒
    days() { return Math.floor(this.totalSeconds / 86400) },
    hours() { return Math.floor((this.totalSeconds % 86400) / 3600) },
    minutes() { return Math.floor((this.totalSeconds % 3600) / 60) },
    seconds() { return Math.floor(this.totalSeconds % 60) }
  },
  actions: {
    // 啟動全局倒數計時器
    startCountdown() {
      // 避免重複建立計時器
      if (this.timer) return
      this.updateTime()
      this.timer = setInterval(() => {
        this.updateTime()
      }, 1000)
    },
    // 更新時間與停止判斷
    updateTime() {
      this.remainingTime = this.targetDate - new Date().getTime()
      if (this.isEnded && this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    // 清除計時器 (可在需要時手動呼叫)
    clearCountdown() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
})
