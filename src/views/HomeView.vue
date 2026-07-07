<template>
  <div class="home d-flex flex-column min-vh-100 overflow-hidden">
    <UserNavbar></UserNavbar>
    <div class="position-relative pb-5 flex-shrink-0">
      <router-view/>
    </div>
    <UserFooter></UserFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import UserNavbar from '@/components/UserNavbar.vue'
import UserFooter from '@/components/UserFooter.vue'
// 匯入 store
import countdownTimer from '@/stores/countdownTimer'
export default {
  name: 'HomeView',
  components: {
    UserNavbar,
    UserFooter
  },
  mounted() {
    // 啟動倒數
    const countdownStore = countdownTimer()
    countdownStore.startCountdown() // 全局只啟動這一次 >> 所有頁面的倒數時間絕對同步，不受切換頁面渲染不一致影響
  }
}
</script>
