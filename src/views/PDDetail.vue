<template>
  <div class="detail">
    單一商品頁
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.params.productId)
  }
}
</script>
