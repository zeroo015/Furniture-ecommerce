<template>
  <div class="waterfall" :style="{'--column-count': columnCount}" ref="waterfall">
    <div class="waterfall-column" v-for="(column, colIndex) in columns" :key="colIndex">
      <div class="product-card" v-for="item in column" :key="item.id">
        <a href="#" @click.prevent="goProduct(item.id)">
          <img class="product-image" :src="item.imagesUrl[0]" :alt="item.title" @load="handleImageLoad($event, item)">
          <div class="product-info text-center">
            <div class="txt text-white">[ {{ item.title }} ]</div>
            <div class="price roboto-font text-info"><span>$</span>{{ $filters.currency(item.price) }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
  <!-- 加載更多 -->
  <div v-if="isLoading" class="loading text-muted">載入中...</div>
  <div v-else-if="!hasMore" class="noMore mt-4">
    <h5 class="chiron-goround-tc-font text-end text-primary mb-md-0">更多商品敬請期待...<i class="bi bi-watch ms-2"></i></h5>
  </div>
  <!-- IntersectionObserver 偵測點 -->
  <div class="load-more-trigger" ref="loadMoreTrigger"></div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/productStore'
import { useBrowseLogStore } from '@/stores/productBrowse'
export default {
  data() {
    return {
      initialNum: 20, // 初始品數
      visibleNum: 10, // 顯示到第幾品
      loadNum: 10, // 每次載入品數
      observer: null,
      // 欄位設定
      columnCount: 2,
      columnHeights: [], // 每欄高度
      columns: [], // 商品被分配到哪一欄
      imageSizes: {}, // 記錄圖片實際尺寸
      rebuildTimer: null,
      // 狀態
      isLoading: false,
      // imagesLoaded: 0, // 避免圖片尚未載入完成就重新分欄
      resizeTimer: null
    }
  },
  computed: {
    ...mapState(useProductStore, ['products']),

    // 篩選本頁商品
    filterProducts() {
      return this.products.filter((item) => item.space.includes('客廳'))
    },
    totalNum() {
      return this.filterProducts.length
    },
    visibleProducts() {
      return this.filterProducts.slice(0, this.visibleNum)
    },
    hasMore() {
      return this.visibleNum < this.totalNum
    }
  },
  methods: {
    ...mapActions(useBrowseLogStore, ['goProduct']),

    // 根據螢幕寬度決定欄數
    updateColumn() {
      const width = window.innerWidth
      if (width >= 1200) {
        this.columnCount = 5
      } else if (width >= 992) {
        this.columnCount = 4
      } else if (width >= 768) {
        this.columnCount = 3
      } else {
        this.columnCount = 2
      }
    },
    handleResize() {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        this.updateColumn()
        this.buildColumns()
      }, 150)
    },
    // 瀑布流 grid
    buildColumns() {
      const columns = Array.from({ length: this.columnCount }, () => []) // 建立空欄位
      const heights = Array(this.columnCount).fill(0) // 預估每欄高度
      this.visibleProducts.forEach(product => {
        // 找出最短欄位放入商品
        const shortestColIndex = this.findShortest(heights)
        columns[shortestColIndex].push(product)
        // 更新欄位高度
        heights[shortestColIndex] += this.getHeight(product)
      })
      this.columns = columns
      this.columnHeights = heights
    },
    findShortest(heights) {
      let shortestIndex = 0
      for (let i = 1; i < heights.length; i++) {
        if (heights[i] < heights[shortestIndex]) {
          shortestIndex = i
        }
      }
      return shortestIndex
    },
    // 取得商品圖尺寸
    handleImageLoad(event, product) {
      const image = event.target
      this.imageSizes[product.id] = {
        width: image.naturalWidth,
        height: image.naturalHeight
      }
      // 圖片尺寸有更新後，重新計算欄位
      // this.buildColumns()
      clearTimeout(this.rebuildTimer)
      this.rebuildTimer = setTimeout(() => {
        this.buildColumns()
      }, 100)
    },
    // 取得欄位高度
    getHeight(product) {
      const imageSize = this.imageSizes[product.id]
      // 預設高度
      if (!imageSize) {
        return 350
      }
      // 取得目前瀑布流容器寬度
      // const waterfall = this.$el.querySelector('.waterfall')
      const waterfall = this.$refs.waterfall
      if (!waterfall) {
        return 350
      }
      // 計算真正的欄位寬度
      const waterfallWidth = waterfall.clientWidth // grid 實際寬度
      const gap = 16 // grid-gap，需和 CSS 設定相同
      const columnWidth = (waterfallWidth - gap * (this.columnCount - 1)) / this.columnCount
      // 取得圖片比例
      const imageRatio = imageSize.height / imageSize.width
      // 真實圖片顯示高度
      const imageHeight = columnWidth * imageRatio
      // 商品資訊區的預估高度(依 CSS 調整)
      const infoHeight = 80
      // 欄位內商品之間的 gap
      const cardGap = 16
      return (
        imageHeight + infoHeight + cardGap
      )
    },
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
    // 自動加載更多
    loadMore() {
      if (!this.hasMore) return
      this.isLoading = true
      const oldCount = this.visibleNum
      this.visibleNum = Math.min(this.visibleNum + this.loadNum, this.totalNum) // 回傳最小值 >> 當載入數量多於總品數顯示總品數
      // 只處理新增的商品
      const newProducts = this.filterProducts.slice(oldCount, this.visibleNum)
      newProducts.forEach(product => {
        const shortestColIndex = this.findShortest(this.columnHeights)
        this.columns[shortestColIndex].push(product)
        this.columnHeights[shortestColIndex] += this.getHeight(product)
      })
      this.isLoading = false
    }
  },
  mounted() {
    // 確保初始顯示數量不超過商品總數
    this.visibleNum = Math.min(this.initialNum, this.totalNum)
    this.updateColumn()
    this.buildColumns()
    this.createObserver() // 建立 IntersectionObserver
    // 監聽螢幕尺寸
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    // 離開頁面時解除 Observer、監聽
    if (this.observer) {
      this.observer.disconnect()
    }
    window.removeEventListener('resize', this.handleResize)
    clearTimeout(this.resizeTimer)
    clearTimeout(this.rebuildTimer)
  }
}
</script>

<style lang="scss" scoped>
.waterfall {
  display: grid;
  grid-template-columns: repeat(var(--column-count), minmax(0, 1fr));
  gap: 16px;
}
// 每欄
.waterfall-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}
.product-card {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  &::after {
    pointer-events: none;
    display: none;
    content: "";
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
  }
  &:hover {
    &::after {
      display: block;
    }
    .product-info {
      display: block;
    }
  }
}
.product-image {
  display: block;
  width: 100%;
  height: auto;
}
.product-info {
  pointer-events: none;
  display: none;
  position: absolute;
  z-index: 5;
  width: 100%;
  top: 50%;
  transform: translateY(-42%);
  padding: 12px;
  font-size: .9em;
  .txt {
    padding-left: .25em;
    letter-spacing: 0.08em;
    line-height: 1.35;
  }
}
.price {
  font-size: 1.5em;
  opacity: .9;
  span {
    font-size: .7em;
  }
}
.noMore {
  padding-top: .5em;
  border-top: solid 1px var(--bs-primary);
}
.load-more-trigger {
  width: 100%;
  height: 1px;
}
</style>
