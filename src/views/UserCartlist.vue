<template>
  <!-- 購物車頁(1) -->
  <!-- 空車 -->
  <div class="emptyCart container-lg" v-if="cart.length < 1">
    <!-- 麵包屑 -->
    <nav class="my-3" aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
      <ol class="breadcrumb default">
        <li class="breadcrumb-item"><router-link to="/" class="link-animated">首頁</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">購物車</li>
      </ol>
    </nav>
    <!-- <div class="fs-2 mt-1"><i class="bi bi-cart-x-fill text-primary"></i></div> -->
    <div class="statusPic col-10 col-md-6 col-lg-4 mx-auto"><img class="img-fluid" src="../assets/images/status_cart.png" alt=""></div>
    <p>您的購物車是空車</p>
    <button type="button" class="btn btn-outline-primary mt-4" @click="goShop">前往選購</button>
  </div>
  <div class="cartlist container-lg pt-5" v-else>
    <!-- 進度條 -->
    <ProgressBar class="progressOne Areabottom" :progress="0"></ProgressBar>
    <!-- 購物車清單 -->
    <div class="list text-start mb-5">
      <h5 class="mb-2">購物車 ({{ cart.length }} 件)</h5>
      <table class="table table-responsive align-middle cartItem">
        <thead class="border-0">
          <tr>
            <td width="350">品項</td>
            <td width="350">優惠活動</td>
            <td width="350">數量</td>
            <td width="200">小計</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td class="row align-items-center">
              <div class="col-4 pic"><img :src="item.product.imagesUrl[0]" alt="" class="img-fluid"></div>
              <div class="col-8">{{ item.product.title }}</div>
            </td>
            <td><span v-if="item.coupon">{{ item.coupon.title }}</span></td>
            <td>
              <!-- v-model 產品數量 (1)min 設定最小值 (2)v-on:change 即時更新購物車 (3):disabled 避免快速連續點擊 -->
              <div class="input-group input-group-sm w-50">
                <button type="button" class="btnMinus btn btn-secondary border-0 rounded-circle" @click="changeQty(item, --item.qty)" :disabled="cartLoading === item.id"><i class="bi bi-dash-lg"></i></button>
                <input type="number" class="form-control text-center border-0 border-bottom shadow-none mx-1" v-model.number="item.qty" min="0" @change="changeQty(item, item.qty)" :disabled="cartLoading === item.id">
                <button type="button" class="btnPlus btn btn-secondary border-0 rounded-circle" @click="changeQty(item, ++item.qty)" :disabled="cartLoading === item.id"><i class="bi bi-plus-lg"></i></button>
                <!-- <div class="input-group-text">/ {{ item.product.unit }}</div> -->
              </div>
            </td>
            <td>
              <small class="me-1" v-if="item.final_total !== item.total">折扣價</small>
              <small class="me-1" v-else>金額</small>
              {{ $filters.currency(item.final_total) }}
              <div><small class="text-success" v-if="item.final_total !== item.total">已套用優惠券</small></div>
            </td>
            <td class="del_icon"><a href="" @click.prevent="delItem(item.id)"><i class="bi bi-trash3 text-sm"></i></a></td>
          </tr>
        </tbody>
      </table>
      <p class="text-end me-1"><router-link to="/shop">繼續購物 ></router-link></p>
    </div>
    <div class="row justify-content-between text-start Areabottom">
      <!-- 左側：提醒事項 -->
      <div class="notice col-7">
        <!-- <h5 class="mb-3">優惠活動</h5> -->
        <div class="col-11">
          <ul class="list-unstyled text-start">
            <li class="d-flex align-items-center p-3 mb-3 rounded bg-primary">
              <span class="text-white chiron-goround-tc-font me-3"><i class="bi bi-box-seam-fill bolder"></i> 到府服務</span>
              <div class="tt me-auto text-light">大型傢俱請於備註欄標示可收貨時間，以利協助送貨到府</div>
            </li>
            <li class="d-flex align-items-center p-3 mb-3 rounded">
              <span class="text-primary chiron-goround-tc-font me-3"><i class="bi bi-clock bolder"></i> 最後倒數</span>
              <div class="tt me-auto">試營運期間購物即享免運優惠</div>
            </li>
            <li class="d-flex align-items-center p-3 mb-3 rounded">
              <span class="text-primary chiron-goround-tc-font me-3"><i class="bi bi-clock bolder"></i> 優惠促銷</span>
              <div class="tt me-auto">限時輸入優惠碼 <span class="text-primary roboto-font" ref="copyTxt">Today99</span> 享全站消費 9 折</div>
              <div class="copyIcon"><a href="" @click.prevent="copyCoupon('copyTxt')"><i v-if="isCopied" class="bi bi-check-lg text-info"></i><i v-else class="bi bi-copy text-info"></i></a></div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 右側：總計 -->
      <div class="order col-5">
        <h5 class="mb-3">訂單資訊</h5>
        <table class="table table-borderless table-responsive">
          <tbody>
            <tr>
              <td>總金額</td>
              <td class="text-end">$ {{ $filters.currency(total.total) }}</td>
            </tr>
            <tr>
              <td>折扣</td>
              <td class="text-end">- $ {{ $filters.currency(total.total - total.final_total) || 0 }}</td>
            </tr>
          </tbody>
        </table>
        <!-- 套用優惠券 -->
        <div class="input-group mt-4">
          <input type="text" class="form-control border-primary" placeholder="請輸入優惠代碼" v-model="coupon.code">
          <button class="btn btn-outline-primary" type="button" @click="addCoupon">套用優惠碼</button>
        </div>
        <small class="text-success ms-1" v-if="total.final_total !== total.total">已套用優惠券</small>
        <hr class="mt-4 mb-2">
        <table class="table table-borderless mb-4">
          <thead>
            <tr>
              <th>總計</th>
              <th class="text-end fs-5">$ {{ $filters.currency(total.final_total) }}</th>
            </tr>
          </thead>
        </table>
        <div class="d-flex gap-2">
          <!-- v-on 清空購物車 -->
          <button class="btn btn-sm btn-outline-dark w-100" @click="clearCart">
            <div v-if="cartLoading === 'clearCart'" class="spinner-border text-dark spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>
            <span v-else>清空購物車</span>
          </button>
          <!-- v-on 前往填寫資料頁 -->
          <button class="btn btn-sm btn-primary w-100" @click="goCheckout">確認結帳</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/productStore'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
export default {
  data() {
    return {
      isCopied: false
    }
  },
  components: {
    ProgressBar
  },
  computed: {
    ...mapState(cartStore, ['cart', 'total', 'coupon']),
    ...mapState(statusStore, ['cartLoading'])
  },
  methods: {
    ...mapActions(useProductStore, ['goShop']),
    ...mapActions(cartStore, ['changeQty', 'delItem', 'clearCart', 'goCheckout', 'addCoupon']),

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
  }
}
</script>

<style lang="scss" scoped>
// :deep() 才可控制子元件內的樣式
:deep(.progressOne) {
  &.boxProgress {
    .progress-bar {
      width: 0%;
    }
  }
}
.list {
  .pic {
    img {
      aspect-ratio: 1 / 1;
      object-fit: cover;
      object-position: center;
    }
  }
  .del_icon {
    a {
      display: block;
      width: 2.2em;
      height: 2.2em;
      color: var(--bs-gray-600);
      border-radius: 10px !important;
      text-align: center;
      align-content: center;
      &:hover {
        color: var(--bs-primary);
        background-color: var(--bs-light);
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
.emptyCart {
  .statusPic {
    padding-bottom: .875em;
  }
  p {
    font-size: 1.25em;
  }
}
@media screen and (max-width:768px) {
  .statusPic {
    font-size: 3.4vw;
  }
}
</style>
