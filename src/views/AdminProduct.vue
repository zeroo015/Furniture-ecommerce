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
            <th width="250">品名</th>
            <th width="100">原價</th>
            <th width="100">售價</th>
            <th>是否啟用</th>
            <th width="200">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price }}</td>
            <td>{{ item.price }}</td>
            <td>
              <p class="mb-0" style="font-size: 1.1rem;" v-if="item.is_enabled"><span class="badge bg-success">已啟用</span></p>
              <p class="mb-0" style="font-size: 1.1rem;" v-else><span class="badge bg-danger">未啟用</span></p>
            </td>
            <td>
              <!-- v-on 開啟商品浮層 (1)tempProduct 傳入 ProductModal (2)$refs 操作子元件的 methods: showModal -->
              <button type="button" class="btn btn-outline-primary btn-sm me-2" @click="openModel(false, item)">編輯</button>
              <!-- v-on 開啟刪除浮層 -->
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
      const api = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}` // 取得商品列表 api
      this.$http.get(api)
        .then((res) => {
          console.log(res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.log(err.response.data)
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
      this.tempProduct = item
      // 新增商品
      let api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product`
      let apiMethod = 'post'
      // 編輯商品
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        apiMethod = 'put'
      }
      this.$http[apiMethod](api, { data: this.tempProduct })
        .then((res) => {
          this.$refs.productModal.hideModal()
          this.getProducts()
        })
    },
    openDelModal(item) {
      this.tempProduct = { ...item }
      this.$refs.delModal.showModal()
    },
    delProduct() {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(api)
        .then((res) => {
          this.$refs.delModal.hideModal()
          this.getProducts()
        })
    }
  },
  created() {
    this.getProducts()
  }
}
</script>
