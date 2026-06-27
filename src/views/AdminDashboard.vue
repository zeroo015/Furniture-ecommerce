<template>
  <AdminNavbar></AdminNavbar>
  <div class="container position-relative p-4">
    <div class="row">
      <!-- 頁籤 -->
      <div class="col-md-3 pb-3">
        <ul class="nav flex-md-column text-start tabNav">
          <li class="nav-item">
            <router-link to="/admin" class="nav-link py-md-3">商品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/order" class="nav-link py-md-3">訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupon" class="nav-link py-md-3">優惠券管理</router-link>
          </li>
        </ul>
      </div>
      <!-- 列表區 -->
      <div class="col-9 bg-white rounded-3">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
export default {
  components: {
    AdminNavbar
  },
  created() {
    // 取得名為 hexToken 的 cookie，內含驗證資訊
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = token

    // 檢視登入狀態
    const api = `${process.env.VUE_APP_API}v2/api/user/check`
    this.$http.post(api)
      .then((res) => {
        console.log(res.data) // 檢視登入狀態
        // 若未登入跳轉回登入頁
        if (!res.data.success) {
          this.$router.push('/login')
        }
      })
      .catch((err) => {
        console.log(err.response.data)
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
