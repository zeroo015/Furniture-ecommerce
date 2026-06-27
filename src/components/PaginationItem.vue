<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 上一頁 -->
      <li class="page-item me-2" :class="{ disabled: !pages.has_pre }">
        <a class="page-link rounded-circle" href="#" aria-label="Previous"><i class="bi bi-arrow-left-short"></i></a>
      </li>
      <!-- v-for -->
      <li class="page-item me-2" v-for="page in pages.total_pages" :key="page" :class="{ active: page === pages.current_page }">
        <a class="page-link rounded-circle border-0" href="#" @click.prevent="$emit('update-page', page)">{{ page }}</a>
      </li>
      <!-- 下一頁 -->
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a class="page-link rounded-circle" href="#" aria-label="Next"><i class="bi bi-arrow-right-short"></i></a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  emits: ['update-page']
}
</script>

<style lang="scss">
.page-link {
  box-sizing: border-box;
  padding: 0;
  align-content: center;
  width: 2.25rem;
  height: 2.25rem;
  .bi {
    font-size: 1.25rem;
  }
}
</style>
