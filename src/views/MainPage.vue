<template>
  <div class="main container-fluid">

    <!-- 版頭 -->
    <div class="Area Area1220 Area_top">
      <div class="box col-md-8 d-flex flex-column text-start">
        <div class="subtitle decoDot ps-2">Featured Item</div>
        <div class="title roboto-font">Chairs</div>
        <div class="PD_info d-flex flex-row gap-1 justify-content-end align-items-end">
          <div class="txt1 chiron-goround-tc-font">經典熱銷</div>
          <div class="txt2 pb-1 me-1 text-end border-bottom">橄欖綠質感工作椅</div>
        </div>
        <button type="button" class="btnMore btn pb-0 pt-1 rounded-0 text-primary bg-white align-self-end">MORE+</button>
      </div>
      <div class="box_PD"><img src="../assets/images/topPD_01.png" alt=""></div>
      <div class="scroll"><img src="../assets/images/arrow.png" alt=""><span class="ms-4">SCROLL</span></div>
    </div>

    <!-- 最新消息 -->
    <div class="Area Area1220 Area_news Areabottom">
      <div class="box col-md-8 text-start">
        <div class="AreaTitle pb-3 fs-2">最新消息</div>
        <ul class="list-unstyled fs-5">
          <li class="mb-2">2026 日式家居新選物全新上架<i class="bi bi-arrow-right-short text-info"></i></li>
          <li class="mb-2">2026 新會員首購折 100<i class="bi bi-arrow-right-short text-info"></i></li>
          <li class="mb-2">0601＿0615 限時優惠／消費滿 2000 折 200<i class="bi bi-arrow-right-short text-info"></i></li>
          <li><span class="badge bg-primary rounded-4 align-text-top me-2">預告</span>人氣 IP 聯名商品將於 7 月到貨</li>
        </ul>
      </div>
    </div>

    <!-- 商品分類 -->
    <div class="Area Area1220 Area_category Areabottom">
      <div class="AreaTitle d-flex justify-content-end align-items-end">
        <div class="d-flex flex-column me-3">
          <div class="smTxt decoDot align-self-end me-2">Shop by</div>
          <div class="engTxt roboto-font text-primary">Category</div>
        </div>
        <div class="pb-3 fs-2">商品分類</div>
      </div>
      <div class="box d-flex">
        <router-link class="PD_cate"><img class="img-fluid" src="../assets/images/PD_cate1.png" alt=""><i class="bi bi-arrow-right-circle-fill text-primary"></i></router-link>
        <router-link class="PD_cate"><img class="img-fluid" src="../assets/images/PD_cate1.png" alt=""><i class="bi bi-arrow-right-circle-fill text-primary"></i></router-link>
        <router-link class="PD_cate"><img class="img-fluid" src="../assets/images/PD_cate1.png" alt=""><i class="bi bi-arrow-right-circle-fill text-primary"></i></router-link>
        <router-link class="PD_cate"><img class="img-fluid" src="../assets/images/PD_cate1.png" alt=""><i class="bi bi-arrow-right-circle-fill text-primary"></i></router-link>
        <router-link class="PD_cate"><img class="img-fluid" src="../assets/images/PD_cate1.png" alt=""><i class="bi bi-arrow-right-circle-fill text-primary"></i></router-link>
      </div>
    </div>

    <!-- 品牌理念 -->
    <div class="Area Area1220 Area_about">
      <div class="AreaTitle d-flex align-items-end">
        <div class="engTxt roboto-font decoDot text-primary me-4">About</div>
        <div class="pb-3 fs-2">品牌理念</div>
      </div>
      <!-- 1 -->
      <div class="box box_1 row justify-content-center align-items-end Areabottom">
        <div class="picArea col-md-6">
          <div class="decoBig roboto-font text-white">Soothe</div>
          <img class="img-fluid" src="../assets/images/about_01.jpg" alt="">
        </div>
        <div class="txtArea txtR col-md-5 border-bottom">
          <div class="slogan d-flex flex-row align-items-end pb-3">
            <div class="txt1 chiron-goround-tc-font decoDot fs-3 me-5">舒適生活</div>
            <div class="txt2 roboto-font display-4 text-primary">01</div>
          </div>
          <ul class="story list-unstyled fs-5 text-start">
            <li class="mb-2">居家生活／隨性恣意</li>
            <li class="mb-2">&nbsp;</li>
            <li class="mb-2">與您一起塑造家的形狀</li>
            <li class="mb-2">構築屬於自己的舒適生活</li>
          </ul>
          <div class="decoTxt">Soothe the Way You Live</div>
        </div>
      </div>
      <!-- 2 -->
      <div class="box box_2 row justify-content-center align-items-end">
        <div class="txtArea txtL col-md-5 border-bottom">
          <div class="slogan d-flex flex-row align-items-end pb-3">
            <div class="txt1 chiron-goround-tc-font decoDot fs-3 me-5">毛孩友善</div>
            <div class="txt2 roboto-font display-4 text-primary">02</div>
          </div>
          <ul class="story list-unstyled fs-5 text-start">
            <li class="mb-2">空間友善／綠色永續</li>
            <li class="mb-2">&nbsp;</li>
            <li class="mb-2">與您一起照護毛孩</li>
            <li class="mb-2">製材製程安全無毒，免除擔憂環境毒素自在生活</li>
          </ul>
          <div class="decoTxt">Well Living with All Life</div>
        </div>
        <div class="picArea col-md-6">
          <div class="decoBig roboto-font text-white">Pet-Friendly</div>
          <img class="img-fluid" src="../assets/images/about_02.jpg" alt="">
        </div>
        <div class="pic2"><img class="img-fluid" src="../assets/images/about_03.jpg" alt=""></div>
      </div>
      <!-- 3 -->
      <div class="box box_3 row justify-content-center align-items-end Areabottom">
        <div class="txtArea txtL col-md-5 border-bottom">
          <div class="slogan d-flex flex-row align-items-end pb-3">
            <div class="txt1 chiron-goround-tc-font decoDot fs-3 me-5">質感嚴選</div>
            <div class="txt2 roboto-font display-4 text-primary">03</div>
          </div>
          <ul class="story list-unstyled fs-5 text-start">
            <li class="mb-2">品味風格／多元選擇</li>
            <li class="mb-2">&nbsp;</li>
            <li class="mb-2">與您一起認識自我</li>
            <li class="mb-2">營造個人居家風格完美品味</li>
          </ul>
          <div class="decoTxt">Crafted for Comfort & Perfect</div>
        </div>
        <div class="picArea col-md-6">
          <div class="decoBig roboto-font text-white">Crafted</div>
          <img class="img-fluid" src="../assets/images/about_04.jpg" alt="">
        </div>
      </div>
    </div>

    <!-- 限時促銷 -->
    <div class="Area Area1220 Area_sale Areabottom">
      <div class="box">
        <div class="AreaTitle d-flex justify-content-center align-items-end text-white">
          <div class="smTxt decoDot align-self-end me-4 mb-2">Deal of the Day</div>
          <div class="fs-2">夏日限定<span class="roboto-font text-warning px-2 display-3">8</span>折</div>
        </div>
        <CountdownClock></CountdownClock>
        <button type="button" class="btn btn-secondary px-5 py-2 fs-5 text-primary fw-bold rounded-pill" @click.prevent="goShop">
          <span v-if="isEnded">我要追蹤</span>
          <span v-else>立即購買</span>
        </button>
      </div>
    </div>

    <!-- 看更多 -->
    <div class="Area Area_more ps-1 pb-2">
      <router-link to="/shop" class="fs-4">更多商品<i class="bi bi-arrow-right-circle-fill text-primary ms-1"></i></router-link>
    </div>

  </div>
</template>

<script>
import CountdownClock from '@/components/CountdownClock.vue'
import { mapState } from 'pinia'
import useCountdownStore from '@/stores/countdownTimer.js'
export default {
  components: {
    CountdownClock
  },
  computed: {
    ...mapState(useCountdownStore, ['isEnded'])
  },
  methods: {
    goShop() {
      this.$router.push('/shop')
    }
  },
  mounted() {
    document.body.style.backgroundColor = '#f1f4f9'
  },
  beforeUnmount() {
    document.body.style.backgroundColor = '' // 離開時復原
  }
}
</script>
