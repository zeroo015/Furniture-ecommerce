<template>
  <!-- Modal 訂單 -->
  <div class="modal text-start" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="orderModalLabel">訂單資料</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-5">
              <h4>用戶資料</h4>
              <table class="table">
                <!-- 還未點擊檢視按鈕時，tempOrder 還未傳入元件會造成 undefind.name，網頁會報錯 >> 加上 v-if 此區塊可先不載入 -->
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th>姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>E-mail</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-7">
              <h4>訂單細節</h4>
              <table class="table mb-3">
                <tbody>
                  <tr>
                    <th width="48%">訂單編號</th>
                    <td width="52%">{{ tempOrder.create_at }}</td>
                  </tr>
                  <tr>
                    <th>購買時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.is_paid">{{ $filters.date(tempOrder.paid_date) }}</span>
                      <span v-else>-</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span v-if="tempOrder.is_paid" class="text-success">已付款</span>
                      <span v-else class="text-danger">未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ $filters.currency(tempOrder.total) }}</td>
                  </tr>
                  <tr class="eventNote">
                    <th>參與優惠</th>
                    <template v-for="product in tempOrder.products" :key="product.id">
                      <td v-if="product.coupon">{{ product.coupon.title }}</td>
                      <td v-else>-</td>
                    </template>
                  </tr>
                </tbody>
              </table>
              <h4 class="mt-5">購買產品</h4>
              <table class="table mb-3">
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <td width="48%">{{ item.product.title }} x {{ item.qty }}</td>
                    <td width="52%">{{ $filters.currency(item.final_total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">確認</button>
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
      tempOrder: {}
    }
  },
  mixins: [modalMixin],
  props: ['order'],
  watch: {
    order() {
      this.tempOrder = { ...this.order }
    }
  }
}
</script>

<style lang="scss" scoped>
.eventNote {
  td {
    display: none;
    &:last-child {
      display: block;
    }
  }
}
</style>
