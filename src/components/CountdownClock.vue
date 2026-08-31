<template>
  <div class="countdown-box timer">
    <!-- 1. 倒數結束：顯示活動結束 -->
    <div v-if="isEnded" class="ended-text">
      限時優惠已結束，追蹤本次特賣商品
    </div>
    <!-- 2. 倒數中：顯示天時分秒，並自動補零 -->
    <div v-else class="timer-text roboto-font py-3">
      <span class="DD bg-white">{{ padZero(days) }}</span><i class="unit mx-1 fst-normal">天</i>
      <span class="HH bg-white">{{ padZero(hours) }}</span><i class="unit mx-1 fst-normal">時</i>
      <span class="MM bg-white">{{ padZero(minutes) }}</span><i class="unit mx-1 fst-normal">分</i>
      <span class="SS bg-white">{{ padZero(seconds) }}</span><i class="unit ms-1 fst-normal">秒</i>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import useCountdownStore from '@/stores/countdownTimer.js'

export default {
  name: 'CountdownClock',
  computed: {
    // 將 Pinia Store 的狀態與 Getter 對應到元件的計算屬性中
    ...mapState(useCountdownStore, ['days', 'hours', 'minutes', 'seconds', 'isEnded'])
  },
  methods: {
    // 補零方法
    padZero(value) {
      return value.toString().padStart(2, '0')
    }
  }
}
</script>

<style lang="scss" scoped>
/* 您可以自由調整多頁面共用的樣式 */
.countdown-box {
  font-size: 1.2em;
  font-weight: bold;
  .timer-text {
    span {
      border-radius: 33%;
    }
  }
}
.ended-text {
  color: var(--bs-info);
  font-size: 1.5em;
  padding-top: 1.5em;
}
</style>
