<template>
  <div class="order pt-3 pb-2">
    <!-- 訂單列表 -->
    <div class="table-responsive mb-1">
      <table class="table text-start align-middle">
        <thead class="border-0">
          <tr>
            <th width="130">訂單編號</th>
            <th width="130">購買時間</th>
            <th width="100">訂購人</th>
            <th width="200">項目</th>
            <th width="120">訂單金額</th>
            <th>付款狀態</th>
            <th width="140">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ item.create_at }}</td>
            <td>{{ $filters.date(item.create_at) }}</td>
            <td>{{ item.user.name }}</td>
            <td>
              <ul class="list-unstyled mb-0">
                <li v-for="product in item.products" :key="product.id">{{ product.product.title }} x {{ product.qty }}</li>
              </ul>
            </td>
            <td>{{ $filters.currency(item.total) }}</td>
            <td>
              <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" :id="`check${item.id}`" v-model="item.is_paid" @change="updateOrder(item)">
              <label class="form-check-label" :for="`check${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
            </td>
            <td>
              <!-- v-on 開啟訂單浮層 (1)tempOrder 傳入 OrderModal -->
              <button type="button" class="btn btn-outline-primary btn-sm me-lg-2 mb-1 mb-lg-0" @click="openOrderModal(item)">編輯</button>
              <!-- v-on 開啟刪除浮層 (1)自定義 tempOrder.title 傳入 DelModal -->
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分頁按鈕 -->
    <PaginationItem :pages="pagination" @update-page="getOrders"></PaginationItem>
  </div>
  <OrderModal ref="orderModal" :order="tempOrder"></OrderModal>
  <DelModal ref="delModal" :product="tempOrder" @delete-product="delOrder"><template #page>訂單</template></DelModal>
</template>

<script>
import OrderModal from '@/components/OrderModal.vue'
import DelModal from '@/components/DelModal.vue'
import PaginationItem from '@/components/PaginationItem.vue'
export default {
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {}
    }
  },
  components: {
    OrderModal,
    DelModal,
    PaginationItem
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}` // 取得訂單列表 api
      this.$http.get(api)
        .then((res) => {
          console.log(res.data)
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        })
    },
    updateOrder(item) {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}` // 修改訂單 api
      const paid = {
        is_paid: item.is_paid,
        paid_date: Math.floor(new Date().getTime() / 1000)
      }
      this.$http.put(api, { data: paid })
        .then((res) => {
          if (res.data.success) {
            this.getOrders() // 若成功重新取得列表
          }
        })
    },
    openOrderModal(item) {
      this.tempOrder = { ...item }
      this.$refs.orderModal.showModal()
    },
    openDelModal(item) {
      this.tempOrder = { ...item }
      this.tempOrder.title = item.create_at
      this.$refs.delModal.showModal()
    },
    delOrder() {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}` // 刪除訂單 api
      this.$http.delete(api)
        .then((res) => {
          this.$refs.delModal.hideModal()
          this.getOrders()
        })
    }
  },
  created() {
    this.getOrders()
  }
}
</script>
