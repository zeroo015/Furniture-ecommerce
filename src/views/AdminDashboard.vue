<template>
  <VueLoading v-model:active="isLoading" :color="'#2c5760'" :width="48" :height="48"></VueLoading>
  <div class="d-flex flex-column min-vh-100" v-if="!isCheckLogin">
    <AdminNavbar></AdminNavbar>
    <div class="admin container position-relative p-4 flex-shrink-0">
      <div class="row">
        <!-- 頁籤 -->
        <div class="col-lg-3 pb-2">
          <ul class="nav flex-lg-column text-start tabNav">
            <li class="nav-item">
              <router-link to="/admin" class="nav-link py-lg-3 px-md-4">商品管理</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/order" class="nav-link py-lg-3 px-md-4">訂單管理</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/coupon" class="nav-link py-lg-3 px-md-4">優惠券管理</router-link>
            </li>
          </ul>
        </div>
        <!-- 列表區 -->
        <div class="col-lg-9 bg-white rounded-3">
          <router-view/>
        </div>
      </div>
    </div>
    <!-- Sticky footer >> flexbox 自動撐滿剩餘區域 -->
    <footer class="footer mt-auto py-3">
      <div class="container p-lg-0 d-flex justify-content-center flex-column flex-md-row">
        <a class="me-2" href="#"><i class="bi bi-github fs-4"></i></a>
        <span class="align-self-center text-muted" style="font-size: .875rem">© 2026 SOOThing. All rights reserved. 本網站僅作個人練習，無商業用途</span>
      </div>
    </footer>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
import { mapState } from 'pinia'
import statusStore from '@/stores/statusStore'
export default {
  data() {
    return {
      isCheckLogin: false
    }
  },
  components: {
    AdminNavbar
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  created() {
    // 取得名為 hexToken 的 cookie，內含驗證資訊
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = token

    // 檢視登入狀態
    this.isCheckLogin = true
    const api = `${process.env.VUE_APP_API}v2/api/user/check`
    this.$http.post(api)
      .then((res) => {
        console.log(res.data) // 檢視登入狀態
        this.isCheckLogin = false
        // 若未登入跳轉回登入頁
        if (!res.data.success) {
          this.$router.push('/login')
        }
      }).catch((err) => {
        console.log(err.response.data)
        this.isCheckLogin = false
        this.$router.push('/login')
      })
  },
  mounted() {
    document.body.style.backgroundColor = '#f1f4f9'
  },
  beforeUnmount() {
    document.body.style.backgroundColor = '' // 離開時復原
  }
}
</script>
