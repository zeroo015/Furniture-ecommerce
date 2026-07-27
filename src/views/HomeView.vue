<template>
  <div class="home d-flex flex-column min-vh-100 overflow-hidden">
    <UserNavbar></UserNavbar>
    <div class="position-relative pb-5 flex-shrink-0">
      <ToastMsgs></ToastMsgs>
      <router-view/>
    </div>
    <UserFooter></UserFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import UserNavbar from '@/components/UserNavbar.vue'
import UserFooter from '@/components/UserFooter.vue'
import ToastMsgs from '@/components/ToastMsgs.vue'
// 匯入 store
import { mapActions } from 'pinia'
import countdownTimer from '@/stores/countdownTimer'
import cartStore from '@/stores/cartStore'
export default {
  // name: 'HomeView',
  components: {
    UserNavbar,
    UserFooter,
    ToastMsgs
  },
  methods: {
    ...mapActions(cartStore, ['getCart'])
  },
  created() {
    this.getCart()
  },
  mounted() {
    // 啟動倒數
    const countdownStore = countdownTimer()
    countdownStore.startCountdown() // 全局只啟動這一次 >> 所有頁面的倒數時間絕對同步，不受切換頁面渲染不一致影響
  }
}
</script>
