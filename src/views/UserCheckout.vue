<template>
  <!-- 購物車頁(2) -->
  <div class="checkout container-lg pt-5">
    <!-- 進度條 -->
    <ProgressBar class="progressOne Areabottom" :progress="50" :is-active2="true"></ProgressBar>
    <div class="row justify-content-between text-start Areabottom">
      <!-- 左側：填寫資料表單 -->
      <div class="userData col-lg-7 col-11 mx-auto">
        <h5 class="mb-3">收件人資料</h5>
        <v-form v-slot="{ errors }" @submit="createOrder" id="checkForm" class="mt-3">
          <!-- 姓名 -->
          <div class="row mb-3">
            <label for="name" class="col-sm-1 col-form-label">姓名</label>
            <div class="col-lg-10 col-sm-11 text-start">
              <v-field id="name" name="姓名" type="text" placeholder="請輸入姓名" class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }" rules="required|min:2" v-model="form.user.name">
              </v-field>
              <error-message name="姓名" class="invalid-feedback ps-2"></error-message>
            </div>
          </div>
          <!-- e-mail -->
          <div class="row mb-3">
            <label for="email" class="col-sm-1 col-form-label">Email</label>
            <div class="col-lg-10 col-sm-11 text-start">
              <v-field id="email" name="email" type="email" placeholder="請輸入 Email" class="form-control"
                :class="{ 'is-invalid': errors['email'] }" rules="required|email" v-model="form.user.email">
              </v-field>
              <error-message name="email" class="invalid-feedback ps-2"></error-message>
            </div>
          </div>
          <!-- 電話 -->
          <div class="row mb-3">
            <label for="tel" class="col-sm-1 col-form-label">電話</label>
            <div class="col-lg-10 col-sm-11 text-start">
              <v-field id="tel" name="電話" type="text" placeholder="請輸入電話 (市話請加區號)" class="form-control"
                :class="{ 'is-invalid': errors['電話'] }" rules="required|min:10" v-model="form.user.tel">
              </v-field>
              <error-message name="電話" class="invalid-feedback ps-2"></error-message>
            </div>
          </div>
          <!-- 地址 -->
          <div class="row mb-3">
            <label for="address" class="col-sm-1 col-form-label">地址</label>
            <div class="col-lg-10 col-sm-11 text-start">
              <v-field id="address" name="地址" type="text" placeholder="請輸入地址" class="form-control"
                :class="{ 'is-invalid': errors['地址'] }" rules="required|min:10" v-model="form.user.address">
              </v-field>
              <error-message name="地址" class="invalid-feedback ps-2"></error-message>
            </div>
          </div>
          <!-- 備註 -->
          <div class="row mb-5 mb-lg-0">
            <label for="message" class="col-sm-1 col-form-label">備註</label>
            <div class="col-lg-10 col-sm-11">
              <textarea id="message" name="備註" class="form-control" rows="5" v-model="form.message" placeholder="可收貨時間、商品顏色...等"></textarea>
            </div>
          </div>
        </v-form>
      </div>
      <!-- 右側：訂購清單(不可改) -->
      <div class="order col-lg-5 col-11 mx-auto">
        <h5 class="mb-3">訂單資訊</h5>
        <div class="boxOrder bg-light">
          <table class="table table-light table-responsive">
            <thead class="border-0">
              <tr>
                <td width="350" class="pb-3">品項</td>
                <td width="150" class="pb-3 text-end">金額</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.id">
                <td class="py-3">{{ item.product.title + ' x ' + item.qty }}</td>
                <td class="py-3 text-end">$ {{ $filters.currency(item.final_total) }}</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-borderless table-light table-responsive mt-5 mb-1">
            <thead>
              <tr>
                <td>總金額</td>
                <td class="text-end">$ {{ $filters.currency(total.total) }}</td>
              </tr>
              <tr>
                <td>折扣<small class="text-success" v-if="cart[0]?.coupon"> (已套用{{ cart[0].coupon.title }}優惠活動)</small></td>
                <td class="text-end">- $ {{ $filters.currency(total.total - total.final_total) || 0 }}</td>
              </tr>
              <tr>
                <th>總計</th>
                <th class="text-end">$ {{ $filters.currency(total.final_total) }}</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="d-flex gap-2 mt-4">
          <!-- v-on 回上一頁 -->
          <button class="btn btn-sm btn-outline-dark w-100" @click="goCartlist">回上一頁</button>
          <!-- v-on 前往結帳頁 -->
          <button class="btn btn-sm btn-primary w-100" form="checkForm">前往結帳</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
export default {
  components: {
    ProgressBar
  },
  computed: {
    ...mapState(cartStore, ['cart', 'total', 'form'])
  },
  methods: {
    ...mapActions(cartStore, ['goCartlist', 'createOrder'])
  }
}
</script>

<style lang="scss" scoped>
:deep(.progressOne) {
  &.boxProgress {
    .progress-bar {
      width: 50%;
    }
  }
}
.boxOrder {
  padding: 1.5em 2em;
}
</style>
