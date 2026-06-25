<template>
  <div class="container-fluid login">
    <!-- v-on 登入 -->
    <form class="row justify-content-center align-items-center min-vh-100" @submit.prevent="signIn">
      <div class="col-md-5 col-11 signArea">
        <h5 class="mb-4 fw-normal">管理者登入</h5>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required autofocus v-model="user.username">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required v-model="user.password">
          <label for="floatingPassword">Password</label>
        </div>
        <button class="btn btn-lg btn-primary sendBtn mt-4" type="submit">登入</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}v2/admin/signin` // 登入 api
      this.$http.post(api, this.user)
        .then((res) => {
          console.log(res.data)
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `hexToken=${token};expires=${new Date(expired)}` // 存入 cookie (hexToken 為自定義變數名稱，expired 轉換成 cookie 可記錄的格式)
            this.$router.push('/admin')
          }
        })
    }
  },
  created() {
    // 確認 api 站點連接成功
    // console.log(process.env.VUE_APP_API)
    // console.log(process.env.VUE_APP_PATH)
  }
}
</script>
