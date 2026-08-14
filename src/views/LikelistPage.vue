<template>
  <div class="like container-lg">
    <!-- 麵包屑 -->
    <nav class="my-3" aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
      <ol class="breadcrumb default">
        <li class="breadcrumb-item"><router-link to="/" class="link-animated">首頁</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">追蹤清單</li>
      </ol>
    </nav>
    <!-- 未追蹤 -->
    <div class="noLike" v-if="likeList.length < 1">
      <div class="fs-2 mt-1"><i class="bi bi-chat-heart text-primary"></i></div>
      <p class="fs-5">沒有追蹤商品，快去逛逛吧</p>
      <button type="button" class="btn btn-outline-primary mt-4" @click="goShop">前往選購</button>
    </div>
    <!-- 追蹤清單 -->
    <div class="box row g-2 g-md-4 mt-2 mb-5 arrangeLine" v-else>
      <h4 class="chiron-goround-tc-font text-primary mb-md-0 pe-2"><i class="bi bi-chat-right-dots-fill me-2"></i>心儀商品趕緊帶回家吧<span class="symbol ms-1">!</span></h4>
      <div class="btnTwo d-flex justify-content-center gap-2">
        <button type="button" class="btn btn-outline-dark" @click="clearLikeList">清空追蹤清單</button>
        <button type="button" class="btn btn-primary" @click="goShop">更多商品</button>
      </div>
      <!-- v-for 商品 -->
      <div class="PD_item col-md-4 col-xl-6" v-for="item in likeProducts" :key="item.id">
        <div class="card border-0 rounded-pill">
          <a href="#" class="direction d-flex" @click.prevent="goProduct(item.id)">
            <div class="pic position-relative">
              <!-- <div class="tag position-absolute top-0 left-0 bg-primary text-white" v-if="item.is_newItem">新品</div> -->
              <img class="card-img-top rounded-circle" :src="item.imagesUrl[0]" :alt="item.title">
            </div>
            <div class="card-body text-start">
              <div class="pdName">{{ item.title }}</div>
              <div class="price d-flex flex-column">
                <div class="oriPrice roboto-font text-muted fw-normal text-decoration-line-through">${{ $filters.currency(item.origin_price) }}</div>
                <div class="salePrice roboto-font text-primary">${{ $filters.currency(item.price) }}</div>
              </div>
            </div>
          </a>
          <div class="actionGroup d-flex align-items-center gap-2">
            <!-- v-on 加入追蹤 -->
            <a v-if="likeList" href="#" class="icon iconAddLike" :class="{'active': isLike(item.id)}" data-title="追蹤清單" @click.prevent="toggleLike(item.id)">
              <i class="bi bi-heart"></i>
              <i class="bi bi-heart-fill" :class="{'text-info': !isLike(item.id), 'text-primary': isLike(item.id)}"></i>
            </a>
            <!-- v-on 加入購物車 (1)顯示 loading 狀態 (2)disabled 以免重複點擊 -->
            <a href="#" class="icon iconAddCart" data-title="購物車" @click.prevent="addCart(item.id)" :class="{disabled: cartLoading === item.id}">
              <div v-if="cartLoading === item.id" class="spinner-border text-info spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>
              <template v-else>
                <i class="bi bi-cart-plus"></i>
                <i class="bi bi-cart-plus-fill text-primary"></i>
              </template>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/productStore'
import { useBrowseLogStore } from '@/stores/productBrowse'
import cartStore from '@/stores/cartStore'
import likeStore from '@/stores/likeStore'
import statusStore from '@/stores/statusStore'
export default {
  computed: {
    ...mapState(useProductStore, ['products']),
    ...mapState(likeStore, ['likeList', 'isLike']),
    ...mapState(statusStore, ['cartLoading']),

    likeProducts() {
      return this.products.filter((item) => this.likeList.find((likeId) => likeId === item.id))
    }
  },
  methods: {
    ...mapActions(useProductStore, ['goShop']),
    ...mapActions(useBrowseLogStore, ['goProduct']),
    ...mapActions(cartStore, ['addCart', 'getCart']),
    ...mapActions(likeStore, ['getLikes', 'toggleLike', 'clearLikeList'])
  },
  mounted() {
    document.body.style.backgroundColor = '#f1f4f9'
  },
  beforeUnmount() {
    document.body.style.backgroundColor = '' // 離開時復原
  }
}
</script>

<style lang="scss" scoped>
.like {
  .arrangeLine {
    justify-content: flex-start;
    .PD_item {
      .card {
        padding: .75em;
      }
      .pic {
        flex-basis: 35%;
      }
      .actionGroup {
        bottom: 19.5%;
        right: 1.75em;
        transform: scale(.9);
      }
    }
    .symbol {
      display: inline-block;
      transform: skewX(-8deg) scale(1.08);
    }
  }
  .btnTwo {
    margin-bottom: 1.5em;
  }
}
@media screen and (min-width:768px) {
  .like {
    .arrangeLine {
      .PD_item {
        width: 50%;
      }
    }
  }
}
@media screen and (min-width:1200px) {
  .like {
    .arrangeLine {
      .PD_item {
        width: 33.33%;
      }
    }
  }
}
</style>
