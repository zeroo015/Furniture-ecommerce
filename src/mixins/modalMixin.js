// 引入 bootstrap modal 元件
import Modal from 'bootstrap/js/dist/modal'

// 共用的 Modal 功能、生命週期
export default {
  methods: {
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal) // 實體化
  }
}
