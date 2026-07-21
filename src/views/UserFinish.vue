<template>
  <div class="finished container-lg pt-5">
    <div class="fs-2 mt-1"><i class="bi bi-check-circle-fill text-primary"></i></div>
    <p class="fs-5">已完成結帳</p>
    <button type="button" class="btn btn-outline-primary mt-4" @click="goShop">繼續購物</button>
    <!-- 兩顆按鈕 -->
    <!-- <div class="d-flex gap-2 col-md-4 mx-auto mt-5">
      <button type="button" class="btn btn-outline-primary w-50" @click="goShop">繼續購物</button>
      <button type="button" class="btn btn-outline-primary w-50 ms-2" @click="goShop">追蹤清單</button>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
export default {
  methods: {
    ...mapActions(cartStore, ['goShop'])
  }
}
</script>
