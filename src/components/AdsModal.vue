<template>
  <!-- Modal bannerAD -->
  <div class="modal fade text-start" id="adsModal" tabindex="-1" aria-labelledby="adsModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 overflow-hidden">
        <div class="modal-body p-0">
          <!-- 動態進度圓環 -->
          <div class="circleTimer" v-if="!isLoading">
            <svg><circle :r="radius" cx="30" cy="30" :style="{ strokeDasharray: circumference, strokeDashoffset: strokeDashoffset }"></circle></svg>
            <!-- <div class="time"><span id="time">{{ timeLeft }}</span></div> -->
          </div>
          <button type="button" class="btn-close rounded-circle" data-bs-dismiss="modal" aria-label="Close"></button>
          <a href="#" data-bs-dismiss="modal" @click.prevent="goShop"><img class="img-fluid" src="../assets/images/ADbn.jpg" alt=""></a>
          <!-- 隨機推薦商品 -->
          <div class="PDArea row p-3">
            <div class="col-6" v-for="item in randomTwoProducts" :key="item.id">
              <a href="#" @click="goProduct(item.id)" data-bs-dismiss="modal">
                <div class="contentR d-flex align-items-center">
                  <div class="pic col-lg-5 p-1 pb-0 p-lg-0"><img :src="item.imagesUrl[0]" alt="" class="img-fluid"></div>
                  <div class="txt col-lg-7">
                    <div class="mb-2 mb-lg-4"><i class="bi bi-pin-angle-fill"></i> HOT SALE</div>
                    <div class="pdName">{{ item.title }}</div>
                    <div class="price">折後 <span class="roboto-font fs-3 text-primary">{{ $filters.currency(item.price) }}</span></div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <template v-if="isEnded"><span class="fw-bold ps-1 me-1 me-md-2">優惠延長</span><span class="italics me-auto fs-5 text-primary">優惠券現領現折！</span></template>
          <template v-else><span class="fw-bold smalltxt"><span class="hide">限時</span>倒數</span><CountdownClock class="me-auto"></CountdownClock></template>
          <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" @click="goShop">立即前往</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
import CountdownClock from './CountdownClock.vue'
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/productStore'
import { useBrowseLogStore } from '@/stores/productBrowse'
import statusStore from '@/stores/statusStore.js'
import countdownTimer from '@/stores/countdownTimer.js'
export default {
  data() {
    return {
      modal: {},
      radius: 20,
      totalTime: 5, // 秒
      timeLeft: 5, // 初始剩餘時間 = totalTime
      timerInterval: null
    }
  },
  mixins: [modalMixin],
  components: {
    CountdownClock
  },
  computed: {
    ...mapState(useProductStore, ['products']),
    ...mapState(statusStore, ['isLoading']),
    ...mapState(countdownTimer, ['isEnded']),

    // 隨機抓取二品
    randomTwoProducts() {
      const shuffledPD = [...this.products].sort(() => 0.5 - Math.random()) // 亂數排序，機率不均等 https://www.shubo.io/javascript-random-shuffle/
      return shuffledPD.slice(0, 2) // 抓取隨機排序陣列的第 0-2(不包含) 筆資料
    },
    // 圓環倒數
    circumference() {
      return 2 * Math.PI * this.radius // 圓周長
    },
    strokeDashoffset() {
      const progress = this.timeLeft / this.totalTime
      return this.circumference * (1 - progress)
    }
  },
  methods: {
    ...mapActions(useProductStore, ['goShop']),
    ...mapActions(useBrowseLogStore, ['goProduct']),

    // 開始圓環倒數
    startTimer() {
      this.timerInterval = setInterval(() => {
        --this.timeLeft
        if (this.timeLeft < 0) {
          clearInterval(this.timerInterval)
          // 時間結束後觸發事件
          this.hideModal()
        }
      }, 1000)
    }
  },
  mounted() {
    this.startTimer()
  }
}
</script>

<style lang="scss" scoped>
#adsModal {
  z-index: 10000;
}
.modal-body {
  position: relative;
  .circleTimer {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    circle {
      fill: none;
      stroke: var(--bs-secondary);
      stroke-width: 3;
      stroke-dasharray: 126; // 圓周長
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 1s linear;
    }
  }
  .btn-close {
    position: absolute;
    padding: .6em;
    top: .76em;
    right: .76em;
  }
  .pic {
    img {
      aspect-ratio: 1 / 1;
      object-fit: cover;
      object-position: center;
    }
  }
  .contentR {
    gap: 1em;
  }
}
.smalltxt {
  margin-right: .1em;
}
:deep(.timer) {
  .timer-text {
    padding: 0 !important;
    font-weight: 500;
    span {
      padding: .15em .25em;
    }
    .unit {
      font-size: .875em;
    }
  }
}
@media screen and (max-width:768px) {
  .PDArea, .modal-footer {
    font-size: 3.8vw;
  }
  .hide {
    display: none;
  }
  :deep(.timer) {
    .timer-text {
      span {
        padding: .05em;
      }
    }
  }
}
@media screen and (max-width:992px) {
  .modal-body {
    .contentR {
      gap: .875em;
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
