<template>
  <!-- Thumbs 大圖 -->
  <swiper
    :style="{
      '--swiper-navigation-color': '#2c5760',
      '--swiper-pagination-color': '#2c5760',
    }"
    :spaceBetween="10"
    :mousewheel="true"
    :navigation="{
      nextEl: '.swiper-button-next', // 下一則
      prevEl: '.swiper-button-prev' // 上一則
    }"
    :thumbs="{ swiper: thumbsSwiper }"
    :modules="modules"
    class="mySwiper2"
  >
    <swiper-slide v-for="(item, i) in product.imagesUrl" :key="'pic' + i">
      <img :src="item" />
    </swiper-slide>
    <!-- 自定義 navigation -->
    <button class="swiper-button-next"></button>
    <button class="swiper-button-prev"></button>
  </swiper>
  <!-- 切換小圖 -->
  <swiper
    @swiper="setThumbsSwiper"
    :spaceBetween="10"
    :slidesPerView="5"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, i) in product.imagesUrl" :key="'pic' + i">
      <img :src="item" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
// import required modules
import { Mousewheel, FreeMode, Navigation, Thumbs } from 'swiper/modules'

import { mapState } from 'pinia'
import { useBrowseLogStore } from '@/stores/productBrowse'
export default {
  data() {
    return {
      thumbsSwiper: null,
      modules: [Mousewheel, FreeMode, Navigation, Thumbs]
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    ...mapState(useBrowseLogStore, ['product'])
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper
    }
  }
}
</script>

<style lang="scss" scoped>
.mySwiper2 {
  height: 80%;
  width: 100%;
  .swiper-slide img {
    object-fit: contain;
    aspect-ratio: 4 / 5;
  }
}
.mySwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 2px; // 為了框內縮 2px
}
.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
  cursor: pointer;
  // 框
  position: relative;
  &::after {
    content: "";
    box-shadow: 0 0 0 2px var(--bs-primary);
    border-radius: inherit;
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: opacity .2s, transform .2s;
    position: absolute;
    top: 0;
    transform: scale(.9);
  }
}
.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
  // 框高亮
  &::after {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
