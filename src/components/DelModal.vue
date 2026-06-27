<template>
  <!-- Modal 刪除 -->
  <div class="modal fade text-start" id="delModal" tabindex="-1" aria-labelledby="delModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 class="modal-title" id="delModalLabel">
            <span>確定刪除<slot name="page">商品</slot>「{{ tempProduct.title }}」嗎?</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          刪除<slot name="page">商品</slot>後將無法復原，確定要永久刪除?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
          <!-- emits：將內層點擊事件傳至外層，觸發外層的 delProduct() -->
          <button type="button" class="btn btn-danger" @click="$emit('delete-product')">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  data() {
    return {
      modal: {},
      tempProduct: {}
    }
  },
  mixins: [modalMixin],
  props: ['product'],
  emits: ['delete-product'],
  watch: {
    product() {
      this.tempProduct = { ...this.product }
    }
  }
}
</script>
