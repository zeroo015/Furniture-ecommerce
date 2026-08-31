<template>
  <div class="product pt-3 pb-2">
    <!-- 新增商品 -->
    <div class="text-end mb-3 me-1">
      <!-- v-on 開啟商品浮層 (1)清空 tempProduct (2)$refs 操作子元件的 methods: showModal -->
      <button type="button" class="btn btn-primary rounded-pill" @click="openModel(true)">新增商品<i class="bi bi-plus-circle-fill ms-1"></i></button>
    </div>
    <!-- 商品列表 -->
    <div class="table-responsive mb-1">
      <table class="table text-start align-middle">
        <thead class="border-0">
          <tr>
            <th width="150">分類</th>
            <th width="240">品名</th>
            <th width="105">原價</th>
            <th width="105">售價</th>
            <th>是否啟用</th>
            <th width="200">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ $filters.currency(item.origin_price) }}</td>
            <td>{{ $filters.currency(item.price) }}</td>
            <td>
              <p class="mb-0" style="font-size: 1.1rem;" v-if="item.is_enabled"><span class="badge bg-success">已啟用</span></p>
              <p class="mb-0" style="font-size: 1.1rem;" v-else><span class="badge bg-danger">未啟用</span></p>
            </td>
            <td>
              <!-- v-on 開啟商品浮層 (1)tempProduct 傳入 ProductModal (2)$refs 操作子元件的 methods: showModal -->
              <button type="button" class="btn btn-outline-primary btn-sm me-md-2 mb-1 mb-md-0" @click="openModel(false, item)">編輯</button>
              <!-- v-on 開啟刪除浮層 (1)tempProduct.title 傳入 DelModal -->
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分頁按鈕 -->
    <PaginationItem :pages="pagination" @update-page="getProducts"></PaginationItem>
  </div>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
  <DelModal ref="delModal" :product="tempProduct" @delete-product="delProduct"></DelModal>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import PaginationItem from '@/components/PaginationItem.vue'
import statusStore from '@/stores/statusStore'
const status = statusStore()
export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false
    }
  },
  components: {
    ProductModal,
    DelModal,
    PaginationItem
  },
  methods: {
    getProducts(page = 1) {
      status.isLoading = true
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}` // 取得商品列表 api
      this.$http.get(api)
        .then((res) => {
          console.log(res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
          status.isLoading = false
          window.scrollTo({
            top: 0,
            behavior: 'instant' // 直接跳至頂部
          })
        }).catch((err) => {
          console.log(err.response.data)
          status.isLoading = false
        })
    },
    openModel(isNew, item) {
      if (isNew) {
        this.tempProduct = {} // 新增
      } else {
        this.tempProduct = { ...item } // 編輯
      }
      this.isNew = isNew
      this.$refs.productModal.showModal()
    },
    updateProduct(item) {
      status.isLoading = true
      this.tempProduct = item
      // 新增商品
      let api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product`
      let apiMethod = 'post'
      let pageNow = 1
      // 編輯商品
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        apiMethod = 'put'
        pageNow = this.pagination.current_page
      }
      this.$http[apiMethod](api, { data: this.tempProduct })
        .then((res) => {
          status.isLoading = false
          this.$refs.productModal.hideModal()
          this.getProducts(pageNow)
          status.msgState(res, '商品更新')
        }).catch((err) => {
          status.isLoading = false
          status.msgState(err, '商品更新')
        })
    },
    openDelModal(item) {
      this.tempProduct = { ...item }
      this.$refs.delModal.showModal()
    },
    delProduct() {
      status.isLoading = true
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}` // 刪除商品 api
      this.$http.delete(api)
        .then((res) => {
          status.isLoading = false
          this.$refs.delModal.hideModal()
          this.getProducts()
          status.msgState(res, '商品刪除')
        }).catch((err) => {
          status.isLoading = false
          status.msgState(err, '商品刪除')
        })
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
// Tablet
@media (min-width:768px) and (max-width:1199.98px) {
  .table {
    tr {
      td:nth-of-type(1) { width: 9%;}
      td:nth-of-type(6) { width: 16%;}
    }
  }
}
</style>
