import axios from 'axios'
import router from '@/router'
import { defineStore } from 'pinia'
import statusStore from './statusStore'

const status = statusStore()
export default defineStore('cartStore', {
  state: () => ({
    cart: [],
    total: {},
    tempCart: {},
    coupon: {
      code: '',
      title: ''
    },
    order: {
      products: {},
      user: {}
    }
  }),
  actions: {
    // 加入購物車
    addCart(id, qty = 1) {
      status.cartLoading = id
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart` // 購物車 api
      const cartItem = { product_id: id, qty: qty } // 建立回傳資料格式
      axios.post(api, { data: cartItem })
        .then((res) => {
          // console.log(res.data)
          this.getCart()
          status.cartLoading = ''
          status.msgState(res, '加入購物車')
        }).catch((err) => {
          status.cartLoading = ''
          status.msgState(err, '加入購物車')
        })
    },
    // 取得購物車清單: 不加 Vueloading 體驗較順暢
    getCart() {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart` // 購物車 api
      axios.get(api)
        .then((res) => {
          // console.log(res.data)
          this.cart = res.data.data.carts
          this.total.total = res.data.data.total
          this.total.final_total = res.data.data.final_total
          // 如果有套用優惠券帶入 couponCode
          if (this.cart[0]?.coupon) {
            this.coupon = this.cart[0].coupon
          }
        }).catch((err) => {
          console.log(err.response.data)
        })
    },
    // 更改商品數量
    changeQty(item, newQty) {
      status.cartLoading = item.id
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart/${item.id}` // 更改數量 api
      const cartItem = { product_id: item.product_id, qty: newQty }
      let apiMethod = 'put'
      if (item.qty === 0) {
        apiMethod = 'delete'
      }
      axios[apiMethod](api, { data: cartItem })
        .then((res) => {
          // console.log(res.data)
          status.cartLoading = ''
          this.getCart()
        }).catch((err) => {
          status.cartLoading = ''
          status.msgState(err, '更改商品數量')
        })
    },
    // 刪除單一商品
    delItem(id) {
      status.isLoading = true
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart/${id}` // 更改數量 api
      axios.delete(api)
        .then((res) => {
          status.isLoading = false
          status.msgState(res, '商品刪除')
          this.getCart()
        }).catch((err) => {
          status.isLoading = false
          status.msgState(err, '商品刪除')
        })
    },
    // 清空購物車
    clearCart() {
      if (confirm('確定清空購物車?')) {
        status.cartLoading = 'clearCart'
        const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/carts` // 刪除全部購物車 api
        axios.delete(api)
          .then((res) => {
            status.cartLoading = ''
            status.msgState(res, '清空購物車')
            this.getCart()
          }).catch((err) => {
            status.cartLoading = ''
            status.msgState(err, '清空購物車')
          })
      }
    },
    // 建立訂單
    createOrder(form) {
      status.isLoading = true
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/order` // 建立訂單 api
      const order = form
      axios.post(api, { data: order })
        .then((res) => {
          // console.log(res)
          const orderId = res.data.orderId
          status.isLoading = false
          router.push(`/paying/${orderId}`)
        }).catch((err) => {
          console.log(err.response.data)
          status.isLoading = false
        })
    },
    // 取得單一訂單: 不加 Vueloading 體驗較順暢
    getOrder(id) {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/order/${id}` // 取得某筆訂單 api
      axios.get(api)
        .then((res) => {
          // console.log(res.data)
          this.order = res.data.order
        }).catch((err) => {
          console.log(err.response.data)
        })
    },
    // 結帳付款
    goPay(id) {
      status.cartLoading = 'paying'
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/pay/${id}` // 付款 api
      axios.post(api)
        .then((res) => {
          // console.log(res)
          status.cartLoading = ''
          status.msgState(res, '訂單付款')
          this.getOrder(id) // 重新取得訂單確認付款狀態
          this.getCart() // 重新取得購物車清單
          setTimeout(() => {
            router.push('/finished')
          }, 3000)
        }).catch((err) => {
          status.cartLoading = ''
          status.msgState(err, '訂單付款')
        })
    },
    goCartlist() {
      router.push('/cart')
    },
    goCheckout() {
      router.push('/checkout')
    },
    // 套用優惠券
    addCoupon() {
      if (!this.coupon.code) return
      status.isLoading = true
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/coupon` // 套用優惠券 api
      const coupon = { code: this.coupon.code }
      axios.post(api, { data: coupon })
        .then((res) => {
          status.isLoading = false
          status.msgState(res, '套用優惠碼')
          this.getCart() // 重新抓取購物車最新折扣資料
        }).catch((err) => {
          status.isLoading = false
          status.msgState(err, '套用優惠碼')
        })
    }
  }
})
