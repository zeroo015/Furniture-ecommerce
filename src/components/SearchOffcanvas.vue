<template>
  <!-- Offcanvas 搜尋 -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref="offcanvas">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Offcanvas right</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      搜尋欄
    </div>
  </div>
</template>

<script>
import offcanvasMixin from '@/mixins/offcanvasMixin'

export default {
  data() {
    return {
      offcanvas: {}
    }
  },
  mixins: [offcanvasMixin]
}
</script>
