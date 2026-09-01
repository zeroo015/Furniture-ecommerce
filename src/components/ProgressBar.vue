<template>
  <div class="boxProgress mx-auto col-10 col-lg-6">
    <div class="cartTxt d-flex justify-content-between">
      <div class="txt1">確認訂單</div>
      <div class="txt2">填寫資料</div>
      <div class="txt3">結帳付款</div>
    </div>
    <div class="position-relative m-4">
      <div class="progress" style="height: 1px;">
        <div class="progress-bar" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <button type="button" @click="goCartlist" class="btn_01 position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style="width: 2rem; height:2rem;">1</button>
      <button type="button" @click="goCheckout" class="btn_02 position-absolute top-0 start-50 translate-middle btn btn-sm rounded-pill" :class="{ 'btn-primary': isActive2, 'btn-light': !isActive2 }" :disabled="!isActive2" style="width: 2rem; height:2rem;">2</button>
      <button type="button" class="btn_03 position-absolute top-0 start-100 translate-middle btn btn-sm rounded-pill" :class="{ 'btn-primary': isActive3, 'btn-light': !isActive3 }" :disabled="!isActive3" style="width: 2rem; height:2rem;">3</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
export default {
  props: {
    progress: {
      type: Number,
      required: true,
      default: 0,
      validator: (value) => value >= 0 && value <= 100
    },
    isActive2: {
      type: Boolean,
      default: false
    },
    isActive3: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(cartStore, ['goCartlist', 'goCheckout', 'goPay'])
  }
}
</script>

<style lang="scss" scoped>
.boxProgress {
  .btn {
    opacity: 1;
  }
}
.cartTxt {
  .txt1 {
    transform: translateX(-.5em);
  }
  .txt3 {
    transform: translateX(.5em);
  }
}
</style>
