// 引入 bootstrap offcanvas 元件
import Offcanvas from 'bootstrap/js/dist/offcanvas'

// 共用的 Offcanvas 功能、生命週期
export default {
  methods: {
    showOffcanvas() {
      this.offcanvas.show()
    },
    hideOffcanvas() {
      this.offcanvas.hide()
    }
  },
  mounted() {
    this.offcanvas = new Offcanvas(this.$refs.offcanvas) // 實體化
  }
}
