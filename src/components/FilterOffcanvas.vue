<template>
  <!-- Offcanvas 篩選 -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref="offcanvas">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel" class="m-0">篩選</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body text-start px-4">
      <div class="filters filter_01 mb-3">
        <div class="tt chiron-goround-tc-font mb-2">分類</div>
        <div class="form-check form-check-inline" v-for="item in filterOpts.category" :key="item">
          <input class="form-check-input" type="radio" name="categoryOpts" :id="item" :value="item" v-model="filterObj.category">
          <label class="form-check-label" :for="item">{{ item }}</label>
        </div>
        <hr>
      </div>
      <div class="filters filter_02 mb-3">
        <div class="tt chiron-goround-tc-font mb-2">風格</div>
        <div class="form-check" v-for="item in filterOpts.style" :key="item">
          <input class="form-check-input" type="checkbox" name="styleOpts" :id="item" :value="item" v-model="filterObj.style">
          <label class="form-check-label" :for="item">{{ item }}</label>
        </div>
        <hr>
      </div>
      <div class="filters filter_03 mb-3">
        <div class="tt chiron-goround-tc-font mb-2">材質</div>
        <div class="form-check" v-for="item in filterOpts.material" :key="item">
          <input class="form-check-input" type="checkbox" name="materialOpts" :id="item" :value="item" v-model="filterObj.material">
          <label class="form-check-label" :for="item">{{ item }}</label>
        </div>
        <hr>
      </div>
      <div class="filters filter_04 mb-3">
        <div class="tt chiron-goround-tc-font mb-2">顏色</div>
        <div class="form-check" v-for="item in filterOpts.colors" :key="item">
          <input class="form-check-input" type="checkbox" name="colorsOpts" :id="item" :value="item" v-model="filterObj.colors">
          <label class="form-check-label" :for="item">{{ item }}</label>
          <span class="color border rounded-pill" :class="{black: item === '黑', beige: item === '米', gray: item === '灰', brown: item === '棕', tan: item === '卡其', green: item === '綠', blue: item === '藍', orange: item === '橘', red: item === '紅'}"></span>
        </div>
        <hr>
      </div>
      <div class="filters filter_05 mb-3">
        <div class="tt chiron-goround-tc-font mb-2">價格區間</div>
        <div class="price_range range-group">
          <div class="input-group">
            <input type="number" class="form-control rounded-0" name="price" id="priceMin" min="0" placeholder="最低價" v-model.number="filterObj.priceMin">
            <span class="input-group-text border-0 bg-white px-3">至</span>
            <input type="number" class="form-control rounded-0" name="price" id="priceMax" max="9999" placeholder="最高價" v-model.number="filterObj.priceMax">
          </div>
        </div>
      </div>
    </div>
    <div class="offcanvas-footer bg-white mt-1">
      <button type="button" class="btn btn-primary w-100" data-bs-dismiss="offcanvas" aria-label="Close">確定</button>
      <button type="button" class="btn btn-outline-dark w-100 mt-2" @click="clearFilters">清除篩選</button>
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
    ...mapState(useProductStore, ['filterObj', 'filterOpts'])
  },
  methods: {
    ...mapActions(useProductStore, ['clearFilters'])
  }
}
</script>

<style lang="scss" scoped>
.filters {
  .form-check {
    .color {
      display: inline-block;
      margin-left: .25em;
      width: 2em;
      height: 1.1em;
      transform: translateY(18%);
      background-color: #fff;
      &.black { background-color: #333;}
      &.beige { background-color: #fffbeb;}
      &.gray { background-color: #8b8d94;}
      &.brown { background-color: #714112;}
      &.tan { background-color: #cdbd8d;}
      &.green { background-color: #a9b65f;}
      &.blue { background-color: #0c4d9b;}
      &.orange { background-color: #ff6300;}
      &.red { background-color: #e03030;}
    }
  }
}
</style>
