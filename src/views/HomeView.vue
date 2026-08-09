<template>
  <VueLoading v-model:active="isLoading" :color="'#2c5760'" :width="48" :height="48"></VueLoading>
  <TopAD></TopAD>
  <div class="home d-flex flex-column min-vh-100">
    <UserNavbar></UserNavbar>
    <div class="position-relative pb-5 flex-shrink-0">
      <ToastMsgs></ToastMsgs>
      <router-view/>
      <GoTop></GoTop>
    </div>
    <UserFooter></UserFooter>
    <AdsModal ref="adsModel"></AdsModal>
  </div>
</template>

<script>
// @ is an alias to /src
import UserNavbar from '@/components/UserNavbar.vue'
import UserFooter from '@/components/UserFooter.vue'
import ToastMsgs from '@/components/ToastMsgs.vue'
import GoTop from '@/components/GoTop.vue'
import TopAD from '@/components/TopAD.vue'
import AdsModal from '@/components/AdsModal.vue'
// 匯入 store
import { mapState, mapActions } from 'pinia'
import countdownTimer from '@/stores/countdownTimer'
import { useProductStore } from '@/stores/productStore'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
export default {
  // name: 'HomeView',
  components: {
    UserNavbar,
    UserFooter,
    ToastMsgs,
    GoTop,
    TopAD,
    AdsModal
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  methods: {
    ...mapActions(useProductStore, ['getSaleProducts']),
    ...mapActions(cartStore, ['getCart'])
  },
  created() {
    this.getCart()
    this.getSaleProducts()
  },
  mounted() {
    // 啟動倒數
    const countdownStore = countdownTimer()
    countdownStore.startCountdown() // 全局只啟動這一次 >> 所有頁面的倒數時間絕對同步，不受切換頁面渲染不一致影響
    this.$refs.adsModel.showModal()
  }
}
</script>
