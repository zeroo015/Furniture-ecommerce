<template>
  <div class="toast bg-white mb-2" :class="`border-${msg.style}`" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-body text-start d-flex">
      <div class="icon me-1 fs-2">
        <i v-if="msg.style === 'success'" class="bi bi-check-circle-fill text-success"></i>
        <i v-else class="bi bi-x-circle-fill text-danger"></i>
      </div>
      <div class="txt ms-2">
        <div class="title fw-bold">{{ msg.type }}</div>
        <div class="hintTxt">{{ msg.title }}<span v-if="msg.hint"> - {{ msg.hint }}</span></div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast'
export default {
  props: ['msg'],
  mounted() {
    const toastEl = this.$refs.toast
    const toast = new Toast(toastEl, {
      delay: 5000 // 5 秒後自動隱藏
    })
    this.$refs.toast.classList.add('slideLeft')
    toast.show()
    // 監聽隱藏事件
    // toastEl.addEventListener('hidden.bs.toast', function () {
    //   // 移除元素 >> 清理 DOM 節省記憶體
    //   toastEl.remove()
    //   console.log('Toast 元素已從 DOM 移除')
    // })
  }
}
</script>

<style lang="scss" scoped>
.toast {
  position: relative;
  overflow: hidden;
  border-left: solid 7px var(--bs-toast-border-color);
  .btn-close {
    position: absolute;
    top: .3125em;
    right: .3125em;
  }
}
</style>
