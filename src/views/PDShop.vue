<template>
  <div class="shop">
    <div class="navArea bg-white border-bottom">
      <div class="container-lg p-lg-0">
        <div class="box d-flex justify-content-center">
          <div class="navItem flex-fill active" @click="getProduct(all)">所有商品</div>
          <div class="navItem flex-fill">椅子／矮凳</div>
          <div class="navItem flex-fill">沙發</div>
          <div class="navItem flex-fill">桌子／餐桌</div>
          <div class="navItem flex-fill">燈具／檯燈</div>
          <div class="navItem flex-fill">櫃子／收納</div>
        </div>
      </div>
    </div>

    <div class="productList container-lg pt-5">
      <!-- 按鈕區 -->
      <div class="d-flex justify-content-between align-items-center px-2">
        <select name="" id="">
          <option value="">排序</option>
        </select>
        <button type="button" class="btn">篩選</button>
        <div class="resultTxt text-start me-auto">找到 100+ 件商品</div>
        <div class="arrange d-flex align-items-center gap-2">
          <a href="#" class="icon iconSquare" data-title="卡片排列"><i class="bi bi-grid"></i></a>
          <a href="#" class="icon iconLine" data-title="橫條排列"><i class="bi bi-list-ul"></i></a>
        </div>
      </div>
      <!-- 商品列表 -->
      <div class="row g-2 g-lg-4">
        <div class="col-6 col-md-3">
          <div class="PD_item card border-0 rounded-0 p-2">
            <a href="#" @click.prevent="goProduct">
              <div class="pic position-relative">
                <div class="tag position-absolute top-0 left-0 bg-primary text-white">新品</div>
                <img class="card-img-top rounded-0" src="images/PD_1_01.jpg" alt="">
              </div>
              <div class="card-body text-start">
                <div class="pdName">橄欖綠質感工作椅</div>
                <div class="price d-flex flex-column">
                  <div class="oriPrice roboto-font text-muted fw-normal text-decoration-line-through">${{ $filters.currency(2999) }}</div>
                  <div class="salePrice roboto-font text-primary">${{ $filters.currency(1680) }}</div>
                </div>
              </div>
            </a>
            <div class="actionGroup d-flex align-items-center gap-2">
              <!-- v-on 加入追蹤 -->
              <a href="#" class="icon iconAddLike" data-title="追蹤清單">
                <i class="bi bi-heart"></i>
                <i class="bi bi-heart-fill text-primary"></i>
              </a>
              <!-- v-on 加入購物車 -->
              <a href="#" class="icon iconAddCart" data-title="購物車">
                <i class="bi bi-cart-plus"></i>
                <i class="bi bi-cart-plus-fill text-primary"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="col-6 col-md-3">
          <div class="PD_item card border-0 rounded-0 p-2">
            <a href="#" @click.prevent="goProduct">
              <div class="pic position-relative">
                <div class="tag position-absolute top-0 left-0 px-2 py-1 bg-primary text-white">新品</div>
                <img class="card-img-top rounded-0" src="../assets/images/about_01.jpg" alt="">
              </div>
              <div class="card-body text-start px-0">
                <div class="pdName mb-2">橄欖綠質感工作椅</div>
                <div class="price d-flex flex-column">
                  <div class="oriPrice roboto-font text-muted fw-normal text-decoration-line-through">${{ $filters.currency(2999) }}</div>
                  <div class="salePrice roboto-font text-primary">${{ $filters.currency(1680) }}</div>
                </div>
              </div>
            </a>
            <div class="actionGroup d-flex align-items-center gap-2">
              <!-- v-on 加入追蹤 -->
              <a href="#" class="iconAddLike"><i class="bi bi-heart" data-title="追蹤清單"></i></a>
              <!-- v-on 加入購物車 -->
              <a href="#" class="iconAddCart ms-1"><i class="bi bi-cart-plus" data-title="購物車"></i></a>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="PD_item card border-0 rounded-0 p-2">
            <a href="#" @click.prevent="goProduct">
              <div class="pic position-relative">
                <div class="tag position-absolute top-0 left-0 px-2 py-1 bg-primary text-white">新品</div>
                <img class="card-img-top rounded-0" src="../assets/images/about_02.jpg" alt="">
              </div>
              <div class="card-body text-start px-0">
                <div class="pdName mb-2">橄欖綠質感工作椅</div>
                <div class="price d-flex flex-column">
                  <div class="oriPrice roboto-font text-muted fw-normal text-decoration-line-through">${{ $filters.currency(2999) }}</div>
                  <div class="salePrice roboto-font text-primary">${{ $filters.currency(1680) }}</div>
                </div>
              </div>
            </a>
            <div class="actionGroup d-flex align-items-center gap-2">
              <!-- v-on 加入追蹤 -->
              <a href="#" class="iconAddLike"><i class="bi bi-heart" data-title="追蹤清單"></i></a>
              <!-- v-on 加入購物車 -->
              <a href="#" class="iconAddCart ms-1"><i class="bi bi-cart-plus" data-title="購物車"></i></a>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="PD_item card border-0 rounded-0 p-2">
            <a href="#" @click.prevent="goProduct">
              <div class="pic position-relative">
                <div class="tag position-absolute top-0 left-0 px-2 py-1 bg-primary text-white">新品</div>
                <img class="card-img-top rounded-0" src="images/PD_1_01.jpg" alt="">
              </div>
              <div class="card-body text-start px-0">
                <div class="pdName mb-2">橄欖綠質感工作椅</div>
                <div class="price d-flex flex-column">
                  <div class="oriPrice roboto-font text-muted fw-normal text-decoration-line-through">${{ $filters.currency(2999) }}</div>
                  <div class="salePrice roboto-font text-primary">${{ $filters.currency(1680) }}</div>
                </div>
              </div>
            </a>
            <div class="actionGroup d-flex align-items-center gap-2">
              <!-- v-on 加入追蹤 -->
              <a href="#" class="iconAddLike"><i class="bi bi-heart" data-title="追蹤清單"></i></a>
              <!-- v-on 加入購物車 -->
              <a href="#" class="iconAddCart ms-1"><i class="bi bi-cart-plus" data-title="購物車"></i></a>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="PD_item card border-0 rounded-0 p-2">
            <a href="#" @click.prevent="goProduct">
              <div class="pic position-relative">
                <div class="tag position-absolute top-0 left-0 px-2 py-1 bg-primary text-white">新品</div>
                <img class="card-img-top rounded-0" src="images/PD_1_01.jpg" alt="">
              </div>
              <div class="card-body text-start px-0">
                <div class="pdName mb-2">橄欖綠質感工作椅</div>
                <div class="price d-flex flex-column">
                  <div class="oriPrice roboto-font text-muted fw-normal text-decoration-line-through">${{ $filters.currency(2999) }}</div>
                  <div class="salePrice roboto-font text-primary">${{ $filters.currency(1680) }}</div>
                </div>
              </div>
            </a>
            <div class="actionGroup d-flex align-items-center gap-2">
              <!-- v-on 加入追蹤 -->
              <a href="#" class="iconAddLike"><i class="bi bi-heart" data-title="追蹤清單"></i></a>
              <!-- v-on 加入購物車 -->
              <a href="#" class="iconAddCart ms-1"><i class="bi bi-cart-plus" data-title="購物車"></i></a>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="PD_item card border-0 rounded-0 p-2">
            <a href="#" @click.prevent="goProduct">
              <div class="pic position-relative">
                <div class="tag position-absolute top-0 left-0 px-2 py-1 bg-primary text-white">新品</div>
                <img class="card-img-top rounded-0" src="images/PD_1_01.jpg" alt="">
              </div>
              <div class="card-body text-start px-0">
                <div class="pdName mb-2">橄欖綠質感工作椅</div>
                <div class="price d-flex flex-column">
                  <div class="oriPrice roboto-font text-muted fw-normal text-decoration-line-through">${{ $filters.currency(2999) }}</div>
                  <div class="salePrice roboto-font text-primary">${{ $filters.currency(1680) }}</div>
                </div>
              </div>
            </a>
            <div class="actionGroup d-flex align-items-center gap-2">
              <!-- v-on 加入追蹤 -->
              <a href="#" class="iconAddLike"><i class="bi bi-heart" data-title="追蹤清單"></i></a>
              <!-- v-on 加入購物車 -->
              <a href="#" class="iconAddCart ms-1"><i class="bi bi-cart-plus" data-title="購物車"></i></a>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div style="height: 2000px;"></div>
  </div>
</template>

<script>
export default {
  methods: {
    getProduct(all) {},
    goProduct() {}
  }
}
</script>
