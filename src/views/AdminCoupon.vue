<template>
  <VueLoading v-model:active="isLoading" :color="'#2c5760'" :width="48" :height="48"></VueLoading>
  <div class="coupon pt-3 pb-2">
    <!-- 新增商品 -->
    <div class="text-end mb-3 me-1">
      <!-- v-on 開啟商品浮層 (1)清空 tempProduct (2)$refs 操作子元件的 methods: showModal -->
      <button type="button" class="btn btn-primary rounded-pill" @click="openCouponModal(true)">新增優惠券<i class="bi bi-plus-circle-fill ms-1"></i></button>
    </div>
    <!-- 優惠券列表 -->
    <div class="table-responsive mb-1">
      <table class="table text-start align-middle">
        <thead class="border-0">
          <tr>
            <th width="150">優惠代碼</th>
            <th width="240">優惠活動</th>
            <th width="100">折扣</th>
            <th width="130">到期日</th>
            <th>是否啟用</th>
            <th width="200">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in coupons" :key="'coupon'+i">
            <td>{{ item.code }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ $filters.date(item.due_date) }}</td>
            <td>
              <p class="mb-0" style="font-size: 1.1rem;" v-if="item.is_enabled"><span class="badge bg-success">已啟用</span></p>
              <p class="mb-0" style="font-size: 1.1rem;" v-else><span class="badge bg-danger">未啟用</span></p>
            </td>
            <td>
              <!-- v-on 開啟優惠券浮層 (1)tempCoupon 傳入 CouponModal -->
              <button type="button" class="btn btn-outline-primary btn-sm me-lg-2 mb-1 mb-lg-0" @click="openCouponModal(false, item)">編輯</button>
              <!-- v-on 開啟刪除浮層 (1)tempProduct.title 傳入 DelModal -->
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分頁按鈕 -->
    <PaginationItem :pages="pagination" @update-page="getCoupons"></PaginationItem>
  </div>
  <CouponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon"></CouponModal>
  <DelModal ref="delModal" :product="tempCoupon" @delete-product="delCoupon"><template #page>優惠活動</template></DelModal>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
import PaginationItem from '@/components/PaginationItem.vue'
import { mapState } from 'pinia'
import statusStore from '@/stores/statusStore'
const status = statusStore()
export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: ''
    }
  },
  components: {
    CouponModal,
    DelModal,
    PaginationItem
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  methods: {
    getCoupons(page = 1) {
      status.isLoading = true
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}` // 取得優惠券列表 api
      this.$http.get(api)
        .then((res) => {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          status.isLoading = false
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    openCouponModal(isNew, item) {
      if (isNew) { // 新增
        this.tempCoupon = {
          is_enabled: 0,
          due_date: Date.now() / 1000 // 傳入後會進行 .toISOString() 運算不可為空值 >> 為避免監聽內又有判斷式的複雜結構，預設為當下時間(單位需統一為秒數)
        }
      } else {
        this.tempCoupon = { ...item } // 編輯
      }
      this.isNew = isNew
      this.$refs.couponModal.showModal()
    },
    updateCoupon(item) {
      status.isLoading = true
      this.tempCoupon = item
      let api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/coupon` // 新增優惠券 api
      let apiMethod = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}` // 修改優惠券 api
        apiMethod = 'put'
      }
      this.$http[apiMethod](api, { data: this.tempCoupon })
        .then((res) => {
          status.isLoading = false
          this.$refs.couponModal.hideModal()
          this.getCoupons()
          status.msgState(res, '優惠券更新')
        })
    },
    openDelModal(item) {
      this.tempCoupon = { ...item }
      this.$refs.delModal.showModal()
    },
    delCoupon() {
      status.isLoading = true
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}` // 刪除優惠券 api
      this.$http.delete(api)
        .then((res) => {
          // console.log(res, this.tempCoupon)
          status.isLoading = false
          this.$refs.delModal.hideModal()
          this.getCoupons()
          status.msgState(res, '優惠券刪除')
        })
    }
  },
  created() {
    this.getCoupons()
  }
}
</script>
