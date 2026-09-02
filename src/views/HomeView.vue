<template>
  <VueLoading v-model:active="isLoading" :color="'#2c5760'" :width="48" :height="48"></VueLoading>
  <TopAD></TopAD>
  <div class="home d-flex flex-column min-vh-100 position-relative">
    <UserNavbar></UserNavbar>
    <div class="position-relative pb-5 flex-shrink-0">
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
import GoTop from '@/components/GoTop.vue'
import TopAD from '@/components/TopAD.vue'
import AdsModal from '@/components/AdsModal.vue'
// 匯入 store
import { mapState, mapActions } from 'pinia'
import countdownTimer from '@/stores/countdownTimer'
import { useProductStore } from '@/stores/productStore'
import cartStore from '@/stores/cartStore'
import likeStore from '@/stores/likeStore'
import statusStore from '@/stores/statusStore'
export default {
  // name: 'HomeView',
  components: {
    UserNavbar,
    UserFooter,
    GoTop,
    TopAD,
    AdsModal
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  methods: {
    ...mapActions(useProductStore, ['getSaleProducts']),
    ...mapActions(cartStore, ['getCart']),
    ...mapActions(likeStore, ['getLikes'])
  },
  created() {
    this.getCart()
    this.getSaleProducts()
    this.getLikes()
  },
  mounted() {
    // 啟動倒數
    const countdownStore = countdownTimer()
    countdownStore.startCountdown() // 全局只啟動這一次 >> 所有頁面的倒數時間絕對同步，不受切換頁面渲染不一致影響
    this.$refs.adsModel.showModal()
  }
}
</script>
