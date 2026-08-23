<template>
  <div class="waterfall">
    <div class="product-card" v-for="item in visibleProducts" :key="item.id">
      <img class="product-image" :src="item.imagesUrl[0]" :alt="item.title" loading="lazy" />
      <!-- <div class="product-info">
        <h3>{{ item.title }}</h3>
        <p class="price roboto-font text-primary">${{ $filters.currency(item.price) }}</p>
      </div> -->
    </div>
  </div>
  <!-- 加載更多 -->
  <div v-if="isLoading" class="loading text-muted">載入中...</div>
  <!-- <div v-else-if="!hasMore" class="noMore">商品已全數加載</div> -->
  <!-- IntersectionObserver 偵測點 -->
  <div class="load-more-trigger" ref="loadMoreTrigger"></div>
</template>

<script>
import { mapState } from 'pinia'
import { useProductStore } from '@/stores/productStore'
export default {
  data() {
    return {
      initialNum: 20, // 初始品數
      visibleNum: 10, // 顯示到第幾品
      loadNum: 10, // 每次載入品數
      isLoading: false,
      observer: null
    }
  },
  computed: {
    ...mapState(useProductStore, ['products']),

    totalNum() {
      return this.products.length
    },
    visibleProducts() {
      return this.products.slice(0, this.visibleNum)
    },
    hasMore() {
      return this.visibleNum < this.totalNum
    }
  },
  methods: {
    // 建立 IntersectionObserver
    createObserver() {
      this.observer = new IntersectionObserver(
        entries => {
          const entry = entries[0]
          if (entry.isIntersecting && !this.isLoading && this.hasMore) {
            this.loadMore()
          }
        },
        {
          // 距離底部 300px 開始載入
          rootMargin: '0px 0px 100px 0px',
          threshold: 0
        })
      this.$nextTick(() => {
        if (this.$refs.loadMoreTrigger) {
          this.observer.observe(this.$refs.loadMoreTrigger)
        }
      })
    },
    // 自動加載下一批
    loadMore() {
      if (this.isLoading || !this.hasMore) return
      this.isLoading = true
      this.visibleNum = Math.min(this.visibleNum + this.loadNum, this.totalNum) // 回傳最小值 >> 當載入數量多於總品數顯示總品數
      this.isLoading = false
    }
  },
  mounted() {
    // 確保初始顯示數量不超過商品總數
    this.visibleNum = Math.min(this.initialNum, this.totalNum)
    // 建立 IntersectionObserver
    this.createObserver()
  },
  beforeUnmount() {
    // 離開頁面時解除 Observer
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}
</script>

<style lang="scss" scoped>
.waterfall {
  column-count: 2;
  column-gap: 1em;
}
.product-card {
  display: inline-block;
  width: 100%;
  margin-bottom: 16px;
  break-inside: avoid; // ?
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.product-image {
  display: block;
  width: 100%;
  height: auto;
}
.product-info {
  padding: 12px;
  h3 {
    margin: 0;
  }
}
.price {
  margin: .5em 0 0;
}
.loading,
.no-more {
  padding: 24px;
  text-align: center;
}
.load-more-trigger {
  height: 1px;
}
// @media (min-width: 576px) {
//   .waterfall {
//     column-count: 3;
//   }
// }
@media (min-width: 768px) {
  .waterfall {
    column-count: 4;
  }
}
@media (min-width: 1200px) {
  .waterfall {
    column-count: 5;
  }
}
</style>
