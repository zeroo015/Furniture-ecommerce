<template>
  <div class="gallery container-lg">
    <!-- 情境推薦 -->
    <router-view name="up"></router-view>
    <!-- 瀑布流商品 -->
    <router-view name="down"></router-view>
    <!-- <ProductWaterfall></ProductWaterfall> -->
  </div>
</template>

<!-- <script>
import ProductWaterfall from '@/components/ProductWaterfall.vue'
export default {
  components: {
    ProductWaterfall
  }
}
</script> -->
