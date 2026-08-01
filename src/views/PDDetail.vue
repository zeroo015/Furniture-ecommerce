<template>
  <div class="detail container-lg" v-if="product.title">
    <div class="row justify-content-evenly align-items-center text-start mb-5">
      <!-- 主圖輪播 -->
      <div class="box_L col-md-6">
        <SwiperThumbs></SwiperThumbs>
      </div>
      <div class="box_R col-md-5 px-5">
        <!-- 麵包屑 -->
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/shop" class="link-animated">商品</router-link></li>
            <li class="breadcrumb-item"><a class="link-animated" href="#" @click.prevent="filterType('category', `${product.category}`)">{{ product.category }}</a></li>
          </ol>
        </nav>
        <!-- 產品資訊 -->
        <h2 class="fw-normal">{{ product.title }}</h2>
        <div class="hashtag text-primary chiron-goround-tc-font my-3">
          <span class="bg-light px-3 py-2 me-2 rounded-pill" v-for="item in product.style" :key="item">#{{ item }}</span>
          <span class="bg-light px-3 py-2 me-2 rounded-pill" v-for="item in product.space" :key="item">#{{ item }}</span>
        </div>
        <template v-if="product.content">
          <!-- <h5 class="chiron-goround-tc-font fw-normal mt-4">商品介紹</h5> -->
          <h6 class="sub-text my-2 fw-normal text-muted mt-3">{{ product.content }}</h6>
        </template>
        <div class="info-text" v-if="product.description">{{ product.description }}</div>
        <div class="price my-4 text-end">
          <del class="roboto-font text-muted fw-normal me-2">${{ $filters.currency(product.origin_price) }}</del>
          <span class="roboto-font me-3">$<span class="fs-3">{{ $filters.currency(product.price) }}</span></span>
        </div>
        <!-- v-model 產品數量 -->
        <div class="input-group w-100 mb-5">
          <button type="button" class="btnMinus btn btn-secondary border-0 rounded-circle" @click="--qty" :disabled="qty === 1"><i class="bi bi-dash-lg"></i></button>
          <input type="number" class="form-control text-center border-0 border-bottom shadow-none mx-1" min="1" name="qty" v-model.number="qty">
          <button type="button" class="btnPlus btn btn-secondary border-0 rounded-circle" @click="++qty"><i class="bi bi-plus-lg"></i></button>
        </div>
        <div class="actionGroup d-flex align-items-center gap-2">
          <!-- v-on 加入購物車 (1)顯示 loading 狀態 (2)disabled 以免重複點擊 -->
          <button type="button" class="btn btn-primary w-100" @click="addCart(productId, qty)" :disabled="cartLoading === productId">
            <div v-if="cartLoading === productId" class="spinner-border text-light spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>
            <i v-else class="bi bi-cart-plus-fill"></i>
            <span class="ms-1">加入購物車</span>
          </button>
          <!-- v-on 加入追蹤 -->
          <!-- <button type="button" class="btn btn-outline-dark w-100" @click="addCart">
            <i class="bi bi-heart-fill"></i>
            <span class="ms-1">加入追蹤</span>
          </button> -->
        </div>
      </div>
    </div>
    <div class="row justify-content-evenly align-items-center text-start Areabottom">
      <div class="col-md-6 px-3">
        <!-- 提醒事項 -->
        <div class="notice">
          <!-- <h5 class="chiron-goround-tc-font fw-normal mt-4 mb-3">優惠活動</h5> -->
          <ul class="list-unstyled text-start">
            <li class="d-flex align-items-center p-3 mb-3 rounded bg-primary">
              <span class="text-white chiron-goround-tc-font me-3"><i class="bi bi-box-seam-fill bolder"></i> 到府服務</span>
              <div class="tt me-auto text-light">大型傢俱請於備註欄標示可收貨時間，以利協助送貨到府</div>
            </li>
            <li class="d-flex align-items-center p-3 mb-3 rounded">
              <span class="text-primary chiron-goround-tc-font me-3"><i class="bi bi-clock bolder"></i> 最後倒數</span>
              <div class="tt me-auto">試營運期間購物即享免運優惠</div>
            </li>
            <li class="d-flex align-items-center p-3 rounded">
              <span class="text-primary chiron-goround-tc-font me-3"><i class="bi bi-clock bolder"></i> 優惠促銷</span>
              <div class="tt me-auto">限時輸入優惠碼 <span class="text-primary roboto-font" ref="copyTxt">Today99</span> 享全站消費 9 折</div>
              <div class="copyIcon"><a href="" @click.prevent="copyCoupon('copyTxt')"><i v-if="isCopied" class="bi bi-check-lg text-info"></i><i v-else class="bi bi-copy text-info"></i></a></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-5 mb-1">
        <!-- 配送 -->
        <div class="note text-start">
          <h6 class="chiron-goround-tc-font fw-normal">配送須知</h6>
          <ul>
            <li>此商品可配送離島區域，您可於結帳時填寫離島地址配送。</li>
            <li>針對大型傢俱，於完成收款確認後一天內(不含例假日)將由專人與您聯繫確認相關配送細節。</li>
            <li>偏遠地區、樓層費及其它加價費用，皆由廠商於約定配送時一併告知，廠商將保留出貨與否的權利。</li>
            <li>廠商出貨全程攝影，為保障您的購物權益，開箱過程亦請全程錄影；如有問題請反映客服並提供錄影檔案。</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 推薦商品(輪播) -->
    <div class="Area_Recommend mb-4">
      <div class="Area Area1220 mb-2">
        <div class="AreaTitle d-flex align-items-end">
          <div class="engTxt roboto-font decoDot text-primary me-4">Recommend</div>
          <div class="pb-3 fs-3">為您推薦</div>
        </div>
      </div>
      <SwiperProducts :propsProducts="recommendProducts" :propsId="productId"></SwiperProducts>
    </div>
    <!-- 瀏覽記錄(輪播) -->
    <div class="Area_Viewed mb-3">
      <div class="Area Area1220 mb-2">
        <div class="AreaTitle d-flex align-items-end">
          <div class="engTxt roboto-font decoDot text-primary me-4">Recently View</div>
          <div class="pb-3 fs-3">最近瀏覽</div>
        </div>
      </div>
      <SwiperProducts :propsProducts="historyProducts" :propsId="productId"></SwiperProducts>
    </div>

  </div>
</template>

<script>
import SwiperThumbs from '@/components/SwiperThumbs.vue'
import SwiperProducts from '@/components/SwiperProducts.vue'
import { mapState, mapActions } from 'pinia'
import { useBrowseLogStore } from '@/stores/productBrowse'
import { useProductStore } from '@/stores/productStore'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
export default {
  data() {
    return {
      productId: '',
      qty: 1,
      isCopied: false,
      recommendCate: '',
      recommendProducts: []
    }
  },
  components: {
    SwiperThumbs,
    SwiperProducts
  },
  computed: {
    ...mapState(useBrowseLogStore, ['product', 'historyProducts']),
    ...mapState(useProductStore, ['products']),
    ...mapState(statusStore, ['cartLoading'])
  },
  methods: {
    ...mapActions(useBrowseLogStore, ['getPDDetail']),
    ...mapActions(useProductStore, ['getSaleProducts', 'filterType']),
    ...mapActions(cartStore, ['addCart']),

    // 一鍵複製優惠券碼
    async copyCoupon(refName) {
      const copyText = this.$refs[refName].innerText
      try {
        await navigator.clipboard.writeText(copyText)
        this.isCopied = true
        setTimeout(() => {
          this.isCopied = false
        }, 2000)
        // alert('內容已成功複製到剪貼簿！')
      } catch (err) {
        console.error('複製失敗：', err)
        alert('複製失敗，請手動複製')
      }
    }
  },
  watch: {
    // 監聽動態 id 的變化 >> 解決重複載入此頁時不再觸發 created() 的問題
    '$route.params.productId': {
      handler(newId) {
        if (newId) {
          this.productId = newId
          this.getPDDetail(newId)
        }
      },
      immediate: true // watcher 在元件一建立時就會立刻執行一次 >> 可以取代 created() 裡的初始呼叫
    },
    product() {
      // 推薦同分類商品
      this.recommendCate = this.product.category
      this.recommendProducts = this.products.filter(item => item.category === this.recommendCate)
    }
  },
  created() {
    // this.productId = this.$route.params.productId
    // this.getPDDetail(this.productId)
    this.getSaleProducts()
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 2.6rem;
  .box_R {
    margin-bottom: 3.5em;
  }
}
.hashtag {
  font-size: .875em;
  margin-left: -.15em;
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
  font-size: 1.1em;
  .btn {
    transform: scale(0.6);
    width: 2.5em;
    height: 2.5em;
  }
  .btnMinus {
    transform-origin: center 70%;
  }
  .btnPlus {
    transform-origin: center 70%;
  }
}
.note {
  font-size: .875em;
  ul {
    margin-top: .75em;
    padding-left: 1em;
  }
  li {
    margin-bottom: .4em;
  }
}
.notice {
  li {
    position: relative;
    background-color: #fff;
    border-left: solid var(--bs-primary) .5em;
    padding-left: 1em;
    box-shadow: 0 .15em .5em rgba(0, 0, 0, .15);
    i.bi {
      font-size: 1.125em;
    }
    .copyIcon {
      position: absolute;
      right: 3%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.AreaTitle {
  font-size: .875em;
}
</style>
