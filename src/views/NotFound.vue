<template>
  <div class="notfound container-lg min-vh-100">
    <div class="box">
      <div class="statusPic col-10 col-md-6 col-lg-4 mx-auto"><img class="img-fluid" src="../assets/images/status_404.png" alt=""></div>
      <h2 class="chiron-goround-tc-font text-primary">找不到此頁面</h2>
      <p class="mt-3">將於 <span class="tt text-primary">{{ timeLeft }}</span> 秒後自動返回首頁</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: 3
    }
  },
  methods: {
    // 開始倒數
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timeLeft--
        if (this.timeLeft < 0) {
          clearInterval(this.timerInterval)
          this.$router.push({ path: '/' })
        }
      }, 1000)
    }
  },
  created() {
    this.startTimer()
    // 自動轉址：3 秒後跳轉至首頁 home
    // setTimeout(() => this.$router.push({ path: '/' }), 3000) // path 為 "/" 既為根目錄，3000為毫秒
  }
}
</script>

<style lang="scss" scoped>
.notfound {
  position: relative;
  .box {
    position: absolute;
    top: 46.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  .statusPic {
    padding-bottom: .875em;
  }
  p {
    font-size: 1.25em;
    padding-right: .2em;
    .tt {
      display: inline-block;
      width: 1.3em;
    }
  }
}
@media screen and (max-width:768px) {
  .notfound {
    font-size: 3.4vw;
  }
}
</style>
