<template>
  <!-- Offcanvas 購物車 -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref="offcanvas">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">購物車</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body px-4 pt-0">
      <!-- 空車 -->
      <div class="text-muted" v-if="cart.length < 1">您的購物車是空車</div>
      <!-- 購物車清單 -->
      <template v-else>
        <div class="PD_cart row text-start py-3 border-bottom" v-for="item in cart" :key="item.id">
          <div class="col-4">
            <div class="pic"><img :src="item.product.imagesUrl[0]" alt="" class="img-fluid"></div>
          </div>
          <div class="col-8">
            <p class="mb-2">{{ item.product.title }}</p>
            <!-- v-model 產品數量 (1)min 設定最小值 (2)v-on:change 即時更新購物車 (3):disabled 避免快速連續點擊 -->
            <div class="input-group input-group-sm mb-3 w-50">
              <button type="button" class="btnMinus btn btn-secondary border-0 rounded-circle" @click="changeQty(item, --item.qty)" :disabled="cartLoading === item.id"><i class="bi bi-dash-lg"></i></button>
              <input type="number" class="form-control text-center border-0 border-bottom shadow-none mx-1" v-model.number="item.qty" min="0" @change="changeQty(item, item.qty)" :disabled="cartLoading === item.id">
              <button type="button" class="btnPlus btn btn-secondary border-0 rounded-circle" @click="changeQty(item, ++item.qty)" :disabled="cartLoading === item.id"><i class="bi bi-plus-lg"></i></button>
              <!-- <div class="input-group-text">/ {{ item.product.unit }}</div> -->
            </div>
            <div class="price position-relative">
              <small class="me-1">金額</small>
              {{ $filters.currency(item.final_total) }}
              <div class="del_icon position-absolute bottom-0 end-0">
                <a href="" @click.prevent="delItem(item.id)"><i class="bi bi-trash3 text-sm"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="total_price mt-3 text-end fw-bold"><small class="me-3">總金額</small>{{ $filters.currency(total.total) }}</div>
      </template>
    </div>
    <div class="offcanvas-footer bg-white mt-1">
      <!-- v-on 前往購物車 -->
      <button type="button" class="btn btn-primary w-100" data-bs-dismiss="offcanvas" aria-label="Close" @click="goCartlist" :disabled="cart.length < 1">訂單結帳</button>
      <!-- v-on 清空購物車 -->
      <button type="button" class="btn btn-outline-dark w-100 mt-2" @click="clearCart" :disabled="cart.length < 1">
        <div v-if="cartLoading === 'clearCart'" class="spinner-border text-info spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>
        <template v-else>清空購物車</template>
      </button>
    </div>
  </div>
</template>

<script>
import offcanvasMixin from '@/mixins/offcanvasMixin'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'

export default {
  data() {
    return {
      offcanvas: {}
    }
  },
  mixins: [offcanvasMixin],
  computed: {
    ...mapState(cartStore, ['cart', 'total']),
    ...mapState(statusStore, ['cartLoading'])
  },
  methods: {
    ...mapActions(cartStore, ['changeQty', 'delItem', 'clearCart', 'goCartlist'])
  }
}
</script>

<style lang="scss" scoped>
.PD_cart {
  .pic {
    img {
      aspect-ratio: 1 / 1;
      object-fit: cover;
      object-position: center;
    }
  }
  .del_icon {
    a {
      color: var(--bs-gray-600);
    }
  }
}

/* input 隱藏箭頭 */
/* Chrome, Safari, Edge, Opera */
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
.input-group {
  .btn {
    transform: scale(.7);
  }
  .btnMinus {
    transform-origin: center left;
  }
  .btnPlus {
    transform-origin: center right;
  }
}
</style>
