<template>
  <swiper
    :style="{
      '--swiper-navigation-color': '#2c5760',
    }"
    :speed="600"
    :parallax="true"
    :autoplay="{
      delay: 4000,
      disableOnInteraction: false,
    }"
    :pagination="pagination"
    :navigation="{
      nextEl: '.swiper-button-next', // 下一則
      prevEl: '.swiper-button-prev' // 上一則
    }"
    :modules="modules"
    class="topPDSwiper"
  >
    <!-- <div
      slot="container-start"
      class="parallax-bg"
      :style="{
        'background-image':
          'url(https://swiperjs.com/demos/images/abstract-1.jpg)',
      }"
      data-swiper-parallax="-23%"
    ></div> -->
    <swiper-slide @click.prevent="goProduct('-OwznPUwdjZvtlXkfO9g')">
      <div class="box col-md-8 d-flex flex-column text-start">
        <div class="subtitle decoDot ps-2" data-swiper-parallax="-300">Featured Item</div>
        <div class="title roboto-font" data-swiper-parallax="-1200">Chairs</div>
        <div class="PD_info d-flex flex-row gap-1 justify-content-end align-items-end">
          <div class="txt1 chiron-goround-tc-font">經典熱銷</div>
          <div class="txt2 pb-1 me-1 text-end border-bottom">橄欖綠質感工作椅</div>
        </div>
        <button type="button" class="btnMore btn pb-0 pt-1 rounded-0 text-primary bg-white align-self-end">MORE+</button>
      </div>
      <div class="box_PD" data-swiper-parallax="-2500"><img src="../assets/images/topPD_01.png" alt=""></div>
    </swiper-slide>
    <swiper-slide @click.prevent="goProduct('-Ox-b_tbmMAeOcmIkSKk')">
      <div class="box col-md-8 d-flex flex-column text-start">
        <div class="subtitle decoDot ps-2" data-swiper-parallax="-300">Featured Item</div>
        <div class="title roboto-font" data-swiper-parallax="-1200">Sofas</div>
        <div class="PD_info d-flex flex-row gap-1 justify-content-end align-items-end">
          <div class="txt1 chiron-goround-tc-font">經典熱銷</div>
          <div class="txt2 pb-1 me-1 text-end border-bottom">小圓單人沙發</div>
        </div>
        <button type="button" class="btnMore btn pb-0 pt-1 rounded-0 text-primary bg-white align-self-end">MORE+</button>
      </div>
      <div class="box_PD" data-swiper-parallax="-2500"><img src="../assets/images/topPD_02.png" alt=""></div>
    </swiper-slide>
    <swiper-slide @click.prevent="goProduct('-P0AfcNsJj5_iYPQgFrd')">
      <div class="box col-md-8 d-flex flex-column text-start">
        <div class="subtitle decoDot ps-2" data-swiper-parallax="-300">New Arrival</div>
        <div class="title roboto-font" data-swiper-parallax="-1200">Tables</div>
        <div class="PD_info d-flex flex-row gap-1 justify-content-end align-items-end">
          <div class="txt1 chiron-goround-tc-font">新品上市</div>
          <div class="txt2 pb-1 me-1 text-end border-bottom">胡桃木紋理三角桌</div>
        </div>
        <button type="button" class="btnMore btn pb-0 pt-1 rounded-0 text-primary bg-white align-self-end">MORE+</button>
      </div>
      <div class="box_PD" data-swiper-parallax="-2500"><img src="../assets/images/topPD_03.png" alt=""></div>
    </swiper-slide>
    <swiper-slide @click.prevent="goProduct('-Ox5Auxb6VmmBl0txpF6')">
      <div class="box col-md-8 d-flex flex-column text-start">
        <div class="subtitle decoDot ps-2" data-swiper-parallax="-300">Best Discount</div>
        <div class="title roboto-font" data-swiper-parallax="-1200">Lamps</div>
        <div class="PD_info d-flex flex-row gap-1 justify-content-end align-items-end">
          <div class="txt1 chiron-goround-tc-font">限時下殺</div>
          <div class="txt2 pb-1 me-1 text-end border-bottom">經典圓形吊燈</div>
        </div>
        <button type="button" class="btnMore btn pb-0 pt-1 rounded-0 text-primary bg-white align-self-end">MORE+</button>
      </div>
      <div class="box_PD" data-swiper-parallax="-2500"><img src="../assets/images/topPD_04.png" alt=""></div>
    </swiper-slide>
    <!-- 自定義 pagination -->
    <div class="swiper-pagination number-pagination"></div>
    <!-- 自定義 navigation -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Parallax, Autoplay, Pagination, Navigation } from 'swiper/modules'

import { mapActions } from 'pinia'
import { useBrowseLogStore } from '@/stores/productBrowse'
export default {
  data() {
    return {
      // 自定義 pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">0' + (index + 1) + '</span>'
        }
      },
      modules: [Parallax, Autoplay, Pagination, Navigation]
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    ...mapActions(useBrowseLogStore, ['goProduct'])
  }
}
</script>
