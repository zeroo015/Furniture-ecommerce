<template>
  <!-- 購物車頁(3) -->
  <div class="paying container-lg pt-5">
    <!-- 進度條 -->
    <ProgressBar class="progressOne Areabottom" :progress="100" :is-active2="true" :is-active3="true"></ProgressBar>
    <div class="row justify-content-center mb-5">
      <div class="col-lg-7 col-11">
        <!-- 訂單資料 -->
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                訂單內容<small v-if="order.products" class="orderNum rounded-3 bg-primary text-white ms-2">{{ Object.keys(order.products).length }}</small>
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div class="accordion-body text-start">
                <table class="table table-responsive">
                  <thead class="border-0">
                    <tr>
                      <td width="350" class="pb-2">品項</td>
                      <td width="150" class="pb-2 text-end">金額</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                      <td class="py-3">{{ item.product.title + ' x ' + item.qty }}</td>
                      <td class="py-3 text-end">$ {{ $filters.currency(item.final_total) }}</td>
                    </tr>
                  </tbody>
                </table>
                <table class="table table-borderless table-responsive mb-2">
                  <thead>
                    <tr>
                      <th>總計</th>
                      <th class="text-end">$ {{ $filters.currency(order.total) }}</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- 收件人資料 -->
        <table class="table text-start mt-4">
          <tbody>
            <tr>
              <th class="py-3" width="200">Email</th>
              <td class="py-3">{{ order.user?.email }}</td>
            </tr>
            <tr>
              <th class="py-3">姓名</th>
              <td class="py-3">{{ order.user?.name }}</td>
            </tr>
            <tr>
              <th class="py-3">收件人電話</th>
              <td class="py-3">{{ order.user?.tel }}</td>
            </tr>
            <tr>
              <th class="py-3">收件人地址</th>
              <td class="py-3">{{ order.user?.address }}</td>
            </tr>
            <tr>
              <th class="py-3">付款金額</th>
              <td class="py-3">$ {{ $filters.currency(order.total) }}</td>
            </tr>
            <tr>
              <th class="py-3">付款狀態</th>
              <td class="py-3">
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- v-on 付款 -->
        <div class="text-end me-1" v-if="order.is_paid === false">
          <button class="btn btn-primary" @click="goPay(orderId)">
            <div v-if="cartLoading === 'paying'" class="spinner-border text-info spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>
            <span v-if="cartLoading === 'paying'">付款中</span>
            <span v-else>確認付款</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
export default {
  data() {
    return {
      orderId: ''
    }
  },
  components: {
    ProgressBar
  },
  computed: {
    ...mapState(cartStore, ['order']),
    ...mapState(statusStore, ['cartLoading'])
  },
  methods: {
    ...mapActions(cartStore, ['getOrder', 'goPay'])
  },
  created() {
    this.orderId = this.$route.params.orderId
    this.getOrder(this.orderId)
  }
}
</script>

<style lang="scss" scoped>
:deep(.progressOne) {
  &.boxProgress {
    .progress-bar {
      width: 100%;
    }
  }
}
.orderNum {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  align-content: center;
  transform: translateY(3%);
}
</style>
