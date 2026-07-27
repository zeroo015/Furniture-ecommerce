import { defineStore } from 'pinia'

export default defineStore('statusStore', {
  state: () => ({
    isLoading: false,
    cartLoading: '',
    messages: []
  }),
  actions: {
    msgState(res, apiRequest = '更新') {
      let msg = {}
      if (res.data.success) {
        msg = {
          type: 'Success',
          style: 'success',
          title: `${apiRequest}成功`
        }
      } else {
        // api 回傳的訊息有些是字串，有些則是陣列 >> 統一格式為陣列
        const message = typeof res.data.message === 'string' ? [res.data.message] : res.data.message
        msg = {
          type: 'Error',
          style: 'danger',
          title: `${apiRequest}失敗`,
          hint: message.join(' /') // 將 api 回傳的 message 陣列串接
        }
      }
      this.messages.push(msg)
    }
  }
})
