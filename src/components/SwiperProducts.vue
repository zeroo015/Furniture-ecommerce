<template>
  <swiper
    :style="{
        '--swiper-navigation-color': '#2c5760',
        '--swiper-scrollbar-color': '#2c5760',
      }"
    :spaceBetween="8"
    :slidesPerView="2.2"
    :slidesPerGroup="2"
    :breakpoints="{
      768: {spaceBetween: 10, slidesPerView: 4.4, slidesPerGroup: 4},
      992: {spaceBetween: 25, slidesPerView: 4.4, slidesPerGroup: 4}
    }"
    :scrollbar="{
      hide: true,
    }"
    :navigation="{
      nextEl: '.swiper-button-next', // 下一則
      prevEl: '.swiper-button-prev' // 上一則
    }"
    :modules="modules"
    class="productSwiper"
  >
    <!-- v-for 商品 -->
    <swiper-slide class="PD_item" v-for="item in propsProducts" :key="item.id" :class="{'d-none': item.id === propsId}">
      <div class="card border-0 rounded-0 p-2">
        <a href="#" class="direction d-flex" @click.prevent="goProduct(item.id)">
          <div class="pic position-relative">
            <div class="tag position-absolute top-0 left-0 bg-primary text-white" v-if="item.is_newItem">新品</div>
            <img class="card-img-top rounded-0" :src="item.imagesUrl[0]" :alt="item.title">
          </div>
          <div class="card-body text-start pb-0">
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
    </swiper-slide>
    <!-- 自定義 navigation -->
    <button class="swiper-button-next"></button>
    <button class="swiper-button-prev"></button>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import { Mousewheel, Scrollbar, Navigation } from 'swiper/modules'

import { mapState, mapActions } from 'pinia'
import { useBrowseLogStore } from '@/stores/productBrowse'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
export default {
  data() {
    return {
      modules: [Mousewheel, Scrollbar, Navigation]
    }
  },
  props: {
    propsProducts: {
      type: Object,
      required: true
    },
    propsId: {
      type: String
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    ...mapState(statusStore, ['cartLoading'])
  },
  methods: {
    ...mapActions(useBrowseLogStore, ['goProduct']),
    ...mapActions(cartStore, ['addCart'])
  }
}
</script>

<style lang="scss" scoped>
.productSwiper {
  padding: .1% 2.5% 1.8%;
}
.PD_item {
  .actionGroup {
    bottom: .725em;
  }
}
.swiper-button-prev, .swiper-button-next {
  top: 35%;
}
// MB
@media screen and (max-width:768px) {
  .swiper-button-prev, .swiper-button-next {
    display: none;
  }
}
</style>
