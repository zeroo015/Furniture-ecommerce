<template>
  <!--回版頭-->
  <div id="gotop" :class="{'cate-open': isOpen}" @click="scrollToTop">TOP</div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      scrollTimer: null // 用於儲存定時器
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滚动
      })
    },
    handleScroll() {
      // 如果定時器存在，就跳過不執行 >> 透過定時器做到節流，每100ms 再執行一次
      if (this.scrollTimer) return
      this.scrollTimer = setTimeout(() => {
        // 核心邏輯
        this.isOpen = window.scrollY > 300 // 滾動超過 300px 顯示
        // 執行完後清除定時器
        this.scrollTimer = null
      }, 100) // 100ms 執行一次
    }
  },
  mounted() {
    // 監聽視窗的滾動事件 >> 滾動高度不會主動觸發 Vue 變數更新，因此無法用 watch
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted() {
    // 解除監聽以釋放記憶體
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
#gotop { /*display: none;*/ position:fixed; z-index:201; right:0; padding:14px 6px 3px 10px; font:12px/30px Verdana; text-align:center; color:#fff; cursor:pointer; transition: 0.2s; transform: translateX(200%);
        bottom: 60px;
        bottom: calc(60px + constant(safe-area-inset-bottom)*0.6 );
        bottom: calc(60px + env(safe-area-inset-bottom)*0.6 );}
#gotop::before { content: ""; position:absolute; top:9px; left:19px; width: 0; height: 0; border: 4px solid #fff; border-color: transparent transparent #fff; }
#gotop::after  { content: ""; z-index:-1; position:absolute; top:50%; left:50%; border-radius:50px 0 0 50px; transform:translate(-50%,-50%); width:44px; height:44px; background-color:rgba(0,0,0,0.8);}
#gotop.cate-open { transform: translateX(0%);}
    /*白色*/
    /* #gotop { color:#000; }
    #gotop::before { border-color: transparent transparent #000;}
    #gotop::after  { background-color: rgba(255,255,255,0.95);  box-shadow:0 1px 0 rgba(242,242,242,1), 0 0 10px rgba(0,0,0,0.2);} */
</style>
