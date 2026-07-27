<template>
  <!-- ToastList：控制定位和訊息呈現 >> 避免頁面過長看不到改為 fixed -->
  <div class="toast-container position-fixed top-0 end-0 p-4">
    <!-- props 將 msg 傳至子元件 Toast -->
    <ToastUnit v-for="(msg, index) in messages" :key="'msg'+index" :msg="msg"></ToastUnit>
  </div>
</template>

<script>
import ToastUnit from './ToastUnit.vue'
import { mapState } from 'pinia'
import statusStore from '@/stores/statusStore.js'
export default {
  components: {
    ToastUnit
  },
  computed: {
    ...mapState(statusStore, ['messages'])
  }
}
</script>
