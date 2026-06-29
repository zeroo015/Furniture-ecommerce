<template>
  <!-- Modal 優惠券 -->
  <div class="modal text-start" id="couponModal" tabindex="-1" aria-labelledby="couponModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="couponModalLabel">
            <span v-if="!tempCoupon.id">新增優惠券</span>
            <span v-else>編輯優惠券</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="code" class="form-label">優惠代碼</label>
            <input type="text" class="form-control" id="code" placeholder="請輸入優惠代碼" v-model="tempCoupon.code">
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">優惠活動</label>
            <input type="text" class="form-control" id="title" placeholder="請輸入優惠內容" v-model="tempCoupon.title">
          </div>
          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="percent" class="form-label">折數 (%)</label>
              <input type="number" class="form-control" id="percent" placeholder="請輸入折數" v-model="tempCoupon.percent">
            </div>
            <div class="mb-3 col-md-6">
              <label for="due_date" class="form-label">到期日</label>
              <input type="date" class="form-control" id="due_date" placeholder="請輸入到期日" v-model="due_date">
            </div>
          </div>
          <hr>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" id="is_enabled" v-model="tempCoupon.is_enabled">
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <!-- emit：將內層 v-model 更新的 tempCoupon 傳到外層儲存 -->
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  data() {
    return {
      modal: {},
      tempCoupon: {},
      due_date: ''
    }
  },
  mixins: [modalMixin],
  props: {
    coupon: {
      type: Object,
      default() { return {} }
    }
  },
  emits: ['update-coupon'],
  watch: {
    coupon() {
      this.tempCoupon = { ...this.coupon }
      // <input> 只吃 YYYY-MM-DD
      const inputDate = new Date(this.tempCoupon.due_date * 1000) // 轉回程式用的 ms
      this.due_date = inputDate.toISOString().split('T')[0]
    },
    due_date() {
      // 轉換為 Unix Timestamp 格式
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date).getTime() / 1000) // 後端需要的單位為秒數，getTime 取得時間為毫秒 >> 除以 1000 轉成秒數
    }
  }
}
</script>
