<template>
  <!-- Offcanvas 搜尋 -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref="offcanvas">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel" class="m-0">搜尋</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body text-start px-4">
      <div class="searchbar input-group mb-5 rounded-0 border-bottom">
        <span class="input-group-text border-0 bg-white" id="basic-addon1"><i class="bi bi-search" data-title="搜尋"></i></span>
        <input type="search" class="form-control border-0 shadow-none" placeholder="要找什麼呢?" aria-label="search" id="search" autocomplete="off" v-model="filterObj.keyword">
      </div>
      <!-- 關鍵字 -->
      <div class="keywords">
        <div class="tt chiron-goround-tc-font mb-2">熱門關鍵字</div>
        <ul class="list-unstyled">
          <li><a href="#" data-bs-dismiss="offcanvas" @click.prevent="filterType('style', '現代簡約')">簡約</a></li>
          <li><a href="#" data-bs-dismiss="offcanvas" @click.prevent="filterType('keyword', '原木')">原木</a></li>
          <li><a href="#" data-bs-dismiss="offcanvas" @click.prevent="filterType('category', '沙發')">沙發</a></li>
          <li><a href="#" data-bs-dismiss="offcanvas" @click.prevent="filterType('category', '桌')">桌子</a></li>
          <li><a href="#" data-bs-dismiss="offcanvas" @click.prevent="filterType('keyword', '設計款')">設計款</a></li>
          <li><a href="#" data-bs-dismiss="offcanvas" @click.prevent="filterType('category', '櫃')">收納</a></li>
          <li><a href="#" data-bs-dismiss="offcanvas" @click.prevent="filterType('keyword', '吊燈')">吊燈</a></li>
        </ul>
      </div>
    </div>
    <div class="offcanvas-footer bg-white mt-1">
      <button type="button" class="btn btn-primary w-100" data-bs-dismiss="offcanvas" aria-label="Close" @click="goShop">搜尋</button>
      <button type="button" class="btn btn-outline-dark w-100 mt-2" data-bs-dismiss="offcanvas" @click="clearFilters">取消</button>
    </div>
  </div>
</template>

<script>
import offcanvasMixin from '@/mixins/offcanvasMixin'
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/productStore'
export default {
  data() {
    return {
      offcanvas: {}
    }
  },
  mixins: [offcanvasMixin],
  computed: {
    ...mapState(useProductStore, ['filterObj'])
  },
  methods: {
    ...mapActions(useProductStore, ['filterType', 'clearFilters', 'goShop'])
  }
}
</script>

<style lang="scss" scoped>
.keywords {
  li {
    display: inline-block;
    font-size: .95em;
    margin-right: .7em;
    margin-bottom: .7em;
    border-radius: 10em;
    background-color: var(--bs-light);
    border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color);
    a {
      display: block;
      padding: .4em .9em;
    }
  }
}
</style>
