<template>
  <VueLoading v-model:active="isLoading" :color="'#2c5760'" :width="48" :height="48"></VueLoading>
  <div class="shop">
    <!-- 商品類別頁籤 -->
    <div class="navArea bg-white border-bottom">
      <div class="container-lg p-lg-0">
        <div class="box d-flex justify-content-center">
          <div class="navItem flex-fill" @click="filterType('category', 'all')" :class="{'active': filterObj.category === 'all'}">所有商品</div>
          <div class="navItem flex-fill" @click="filterType('category', '椅')" :class="{'active': filterObj.category === '椅'}">椅子／矮凳</div>
          <div class="navItem flex-fill" @click="filterType('category', '沙發')" :class="{'active': filterObj.category === '沙發'}">沙發</div>
          <div class="navItem flex-fill" @click="filterType('category', '桌')" :class="{'active': filterObj.category === '桌'}">桌子／餐桌</div>
          <div class="navItem flex-fill" @click="filterType('category', '燈')" :class="{'active': filterObj.category === '燈'}">燈具／檯燈</div>
          <div class="navItem flex-fill" @click="filterType('category', '櫃')" :class="{'active': filterObj.category === '櫃'}">櫃子／收納</div>
        </div>
      </div>
    </div>
    <div class="productList container-lg pt-5">
      <!-- 按鈕區 -->
      <div class="filterBar d-flex justify-content-between align-items-center mb-md-4 px-2">
        <div>
          <!-- 排序(下拉選單) -->
          <div class="btn-group">
            <button type="button" class="selectOrder btn btn-outline-primary dropdown-toggle text-start" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="sortTxt" :class="{'d-inline': order === 'default'}">排序</span>
              <span class="sortTxt" :class="{'d-inline': order === 'priceDown'}">價格高至低</span>
              <span class="sortTxt" :class="{'d-inline': order === 'priceUp'}">價格低至高</span>
              <span class="sortTxt" :class="{'d-inline': order === 'newItem'}">新品優先</span>
              <span class="sortTxt" :class="{'d-inline': order === 'category'}">依類別排序</span>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" @click.prevent="sortBy('priceDown')">價格高至低</a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="sortBy('priceUp')">價格低至高</a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="sortBy('newItem')">新品優先</a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="sortBy('category')">依類別排序</a></li>
            </ul>
          </div>
          <!-- 篩選(按鈕) -->
          <button type="button" class="btnFilter btn bg-light ms-2" @click.prevent="openFilterOffcanvas">篩選
            <span v-if="filterTotal" class="ms-1"><small class="rounded-3 bg-primary text-white">{{ filterTotal }}</small><i class="bi"></i></span>
            <i v-else class="bi bi-filter ms-1"></i>
          </button>
        </div>
        <div class="resultTxt text-start me-auto ms-3 d-none d-md-block">找到 {{ filterData.length }} 件商品</div>
        <!-- 排列方式切換 -->
        <div class="arrangeIcon d-flex align-items-center gap-2">
          <a href="#" class="icon iconCard" @click.prevent="arrangeCard"><i class="bi bi-grid" data-title="卡片排列"></i></a>
          <a href="#" class="icon iconLine" @click.prevent="arrangeLine"><i class="bi bi-list-ul" data-title="橫條排列"></i></a>
        </div>
      </div>
      <div class="resultTxt text-start mt-3 mb-2 px-2 d-md-none">找到 {{ filterData.length }} 件商品</div>
      <!-- 商品列表 -->
      <div class="boxPD row g-1 g-lg-4" ref="boxPD">
        <!-- v-for 商品 -->
        <div class="PD_item col-6 col-md-3" v-for="item in pageData" :key="item.id">
          <div class="card border-0 rounded-0 p-2">
            <a href="#" class="direction d-flex" @click.prevent="goProduct(item.id)">
              <div class="pic position-relative">
                <div class="tag position-absolute top-0 left-0 bg-primary text-white" v-if="item.is_newItem">新品</div>
                <img class="card-img-top rounded-0" :src="item.imagesUrl[0]" :alt="item.title">
              </div>
              <div class="card-body text-start">
                <div class="pdName">{{ item.title }}</div>
                <div class="price d-flex flex-column">
                  <div class="oriPrice roboto-font text-muted fw-normal text-decoration-line-through">${{ $filters.currency(item.origin_price) }}</div>
                  <div class="salePrice roboto-font text-primary">${{ $filters.currency(item.price) }}</div>
                </div>
              </div>
            </a>
            <div class="actionGroup d-flex align-items-center gap-2">
              <!-- v-on 加入追蹤
              <a href="#" class="icon iconAddLike" data-title="追蹤清單">
                <i class="bi bi-heart"></i>
                <i class="bi bi-heart-fill text-primary"></i>
              </a> -->
              <!-- v-on 加入購物車 (1)顯示 loading 狀態 (2)disabled 以免重複點擊 -->
              <a href="#" class="icon iconAddCart" data-title="購物車" @click.prevent="addCart(item.id)" :class="{disabled: cartLoading === item.id}">
                <div v-if="cartLoading === item.id" class="spinner-border text-info spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>
                <template v-else>
                  <i class="bi bi-cart-plus"></i>
                  <i class="bi bi-cart-plus-fill text-primary"></i>
                </template>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- 分頁按鈕 -->
      <PaginationItem class="mt-3 mb-1" :pages="pagination" @update-page="goPage"></PaginationItem>
    </div>
    <FilterOffcanvas ref="filterOffcanvas"></FilterOffcanvas>
  </div>
</template>

<script>
import FilterOffcanvas from '@/components/FilterOffcanvas.vue'
import PaginationItem from '@/components/PaginationItem.vue'
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/productStore'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
export default {
  components: {
    FilterOffcanvas,
    PaginationItem
  },
  computed: {
    ...mapState(useProductStore, ['pageData', 'pagination', 'filterObj', 'filterData', 'filterTotal', 'order']),
    ...mapState(statusStore, ['isLoading', 'cartLoading'])
  },
  methods: {
    ...mapActions(useProductStore, ['getSaleProducts', 'goPage', 'goProduct', 'sortBy', 'filterType', 'resetPage']),
    ...mapActions(cartStore, ['addCart', 'getCart']),

    openFilterOffcanvas() {
      this.$refs.filterOffcanvas.showOffcanvas()
    },
    arrangeCard() {
      this.$refs.boxPD.classList.remove('arrangeLine')
    },
    arrangeLine() {
      this.$refs.boxPD.classList.add('arrangeLine')
    }
  },
  watch: {
    // 關鍵優化：filters 內任何條件改變時自動跳回第一頁
    filterObj: {
      handler() {
        this.resetPage()
      },
      deep: true // 必須開啟深度監聽，才能偵測到物件內部的屬性變化
    },
    // 當切換排序自動跳回第一頁
    order() {
      this.resetPage()
    }
  },
  created() {
    this.getSaleProducts()
  }
}
</script>
