<template>
  <div v-if="!isClosed" class="topAD d-flex justify-content-center align-items-center bg-primary w-100 gap-1">
    <a class="d-block p-2 text-white" href="#" @click.prevent="goShop">夏日限定全品項 8 折</a>
    <CountdownClock></CountdownClock>
    <button type="button" class="btn btnClose text-white" @click="closeArea"><i class="bi bi-x"></i></button>
  </div>
</template>

<script>
import CountdownClock from './CountdownClock.vue'
import { mapActions } from 'pinia'
import { useProductStore } from '@/stores/productStore.js'
export default {
  data() {
    return {
      isClosed: false
    }
  },
  components: {
    CountdownClock
  },
  methods: {
    ...mapActions(useProductStore, ['goShop']),
    // 關閉廣告
    closeArea() {
      this.isClosed = true
    }
  }
}
</script>

<style lang="scss" scoped>
.topAD {
  position: relative;
  .btnClose {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.2em;
  }
}
:deep(.timer) {
  font-size: .875em;
  .timer-text {
    padding: 0 !important;
    font-weight: 500;
    span {
      padding: .15em .25em;
    }
    .unit {
      color: #fff;
    }
  }
}
</style>
