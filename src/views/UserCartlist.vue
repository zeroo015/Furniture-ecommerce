<template>
  <!-- 購物車頁(1) -->
  <div class="cart container-lg">
    <!-- 麵包屑 -->
    <nav class="my-3" aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';" v-if="cart.length < 1">
      <ol class="breadcrumb default">
        <li class="breadcrumb-item"><router-link to="/" class="link-animated">首頁</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">購物車</li>
      </ol>
    </nav>
    <!-- 空車 -->
    <div class="emptyCart" v-if="cart.length < 1">
      <!-- <div class="fs-2 mt-1"><i class="bi bi-cart-x-fill text-primary"></i></div> -->
      <div class="statusPic col-10 col-md-6 col-lg-4 mx-auto"><img class="img-fluid" src="../assets/images/status_cart.png" alt=""></div>
      <p>您的購物車是空車</p>
      <button type="button" class="btn btn-outline-primary mt-4" @click="goShop">前往選購</button>
    </div>
    <div class="cartlist pt-5" v-else>
      <!-- 進度條 -->
      <ProgressBar class="progressOne Areabottom" :progress="0" />
      <!-- 購物車清單 -->
      <div class="list text-start mb-5">
        <h5 class="mb-2">購物車 ({{ cart.length }} 件)</h5>
        <table class="table table-responsive align-middle cartItem">
          <thead class="border-0 hide">
            <tr>
              <td>
                <span class="td1">品項</span>
                <span class="td2">優惠活動</span>
                <span class="td3">數量</span>
                <span class="td4">小計</span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="row justify-content-center py-0 border-0">
                <div class="row text-start px-2 py-3 py-md-1 border-bottom" v-for="item in cart" :key="item.id">
                  <div class="pdLink col-3 col-md-1 p-1" @click="goProduct(item.product.id)">
                    <div class="pic"><img :src="item.product.imagesUrl[0]" alt="" class="img-fluid"></div>
                  </div>
                  <div class="col-9 col-md-11 d-flex flex-column flex-md-row justify-content-center align-items-md-center">
                    <p class="pdName mb-0">{{ item.product.title }}</p>
                    <div class="eventName" :class="{'hide': !item.coupon}">
                      <span class="d-md-none">＜</span>
                      <span v-if="item.coupon">{{ item.coupon.title }}</span>
                      <span v-else> - </span>
                      <span class="d-md-none">＞</span>
                    </div>
                    <!-- v-model 產品數量 (1)min 設定最小值 (2)v-on:change 即時更新購物車 (3):disabled 避免快速連續點擊 -->
                    <div class="pdNum input-group input-group-sm">
                      <button type="button" class="btnMinus btn btn-secondary border-0 rounded-circle" @click="changeQty(item, --item.qty)" :disabled="cartLoading === item.id"><i class="bi bi-dash-lg"></i></button>
                      <input type="number" class="form-control text-center border-0 border-bottom shadow-none mx-1" v-model.number="item.qty" min="0" @change="changeQty(item, item.qty)" :disabled="cartLoading === item.id">
                      <button type="button" class="btnPlus btn btn-secondary border-0 rounded-circle" @click="changeQty(item, ++item.qty)" :disabled="cartLoading === item.id"><i class="bi bi-plus-lg"></i></button>
                      <!-- <div class="input-group-text">/ {{ item.product.unit }}</div> -->
                    </div>
                    <div class="price position-relative">
                      <small class="me-1" v-if="item.final_total !== item.total">折扣價</small>
                      <small class="me-1" v-else>金額</small>
                      {{ $filters.currency(item.final_total) }}
                      <div class="saleTxt"><small class="text-success" v-if="item.final_total !== item.total">已套用優惠券</small></div>
                      <div class="del_icon position-absolute">
                        <a href="" @click.prevent="delItem(item.id)"><i class="bi bi-trash3 text-sm"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-end me-1"><router-link to="/shop">繼續購物 ></router-link></p>
      </div>
      <div class="row justify-content-lg-between justify-content-around text-start Areabottom">
        <!-- 左側：提醒事項 -->
        <div class="notice col-lg-7 col-md-6">
          <!-- <h5 class="mb-3">優惠活動</h5> -->
          <div class="col-lg-11">
            <ul class="list-unstyled text-start">
              <li class="d-flex align-items-center p-3 mb-3 rounded bg-primary">
                <span class="text-white chiron-goround-tc-font col-2 me-1"><i class="bi bi-box-seam-fill bolder"></i> 到府服務</span>
                <div class="tt me-auto text-light">大型傢俱請於備註欄標示可收貨時間，以利協助送貨到府</div>
              </li>
              <li class="d-flex align-items-center p-3 mb-3 rounded">
                <span class="text-primary chiron-goround-tc-font col-2 me-1"><i class="bi bi-clock bolder"></i> 最後倒數</span>
                <div class="tt me-auto">試營運期間購物即享免運優惠</div>
              </li>
              <li class="d-flex align-items-center p-3 mb-3 rounded">
                <span class="text-primary chiron-goround-tc-font col-2 me-1"><i class="bi bi-clock bolder"></i> 優惠促銷</span>
                <div class="tt me-auto">限時輸入優惠碼 <span class="text-primary roboto-font" ref="copyTxt">Today99</span> <br class="d-lg-none">享全站消費 9 折</div>
                <div class="copyIcon"><a href="" @click.prevent="copyCoupon('copyTxt')"><i v-if="isCopied" class="bi bi-check-lg text-info"></i><i v-else class="bi bi-copy text-info"></i></a></div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 右側：總計 -->
        <div class="order col-md-5">
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
            <button class="btn btn-outline-dark w-100" @click="clearCart">
              <div v-if="cartLoading === 'clearCart'" class="spinner-border text-dark spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>
              <span v-else>清空購物車</span>
            </button>
            <!-- v-on 前往填寫資料頁 -->
            <button class="btn btn-primary w-100" @click="goCheckout">確認結帳</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/productStore'
import { useBrowseLogStore } from '@/stores/productBrowse'
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
    ...mapActions(useBrowseLogStore, ['goProduct']),
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
  .pdLink {
    cursor: pointer;
  }
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
  .cartItem {
    td {
      display: flex;
    }
    .del_icon {
      bottom: -.375em;
      right: 0;
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
// PC
@media screen and (min-width:1200px) {
  .list {
    .cartItem {
      td {
        .td1, .td2, .td3 {
          flex: 3;
        }
        .td4 {
          flex: 2;
        }
      }
      .pdName {
        flex: 4.7;
      }
      .eventName {
        flex: 7;
      }
      .pdNum {
        flex: 3.5;
        padding-right: 15%;
      }
      .price {
        flex: 4.5;
      }
    }
  }
}
// Tablet
@media (min-width:768px) and (max-width:1199.98px) {
  .list {
    padding: 0 2%;
    .cartItem {
      td {
        .td1 {
          flex: 3;
        }
        .td2, .td3 {
          flex: 2.3;
        }
        .td4 {
          flex: 1.6;
        }
      }
      .pdName {
        flex: 6.4;
      }
      .eventName {
        flex: 7;
      }
      .pdNum {
        flex: 5;
        padding-right: 8%;
      }
      .price {
        flex: 4.5;
      }
      .del_icon {
        right: -11%;
      }
    }
  }
  .notice {
    span {
      width: 30%;
    }
  }
}
// MB
@media screen and (max-width:768px) {
  .emptyCart {
    font-size: 3.4vw;
  }
  h5 {
    padding-left: 2%;
  }
  .list {
    padding: 0 .5rem;
    .hide {
      display: none;
    }
    .input-group {
      justify-content: center;
      gap: .25em;
      .btnMinus, .btnPlus {
        transform-origin: center;
      }
    }
    .cartItem {
      .eventName {
        margin-top: .2em;
      }
      .pdNum {
        margin: .6em 0;
        width: 75%;
      }
      .saleTxt {
        display: inline-block;
        margin-left: .4em;
      }
      .del_icon {
        right: -8%;
      }
    }
  }
  .notice {
    margin-bottom: 0.75em;
    ul {
      padding: 0 1.75%;
    }
    span {
      width: 30%;
    }
  }
  .order {
    padding: 0 1rem;
  }
}
</style>
