<template>
  <!-- Modal 商品 -->
  <div class="modal text-start" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
    <!-- v-model -->
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="productModalLabel">
            <span v-if="!tempProduct.id">新增商品</span>
            <span v-else>編輯商品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- 左側：商品圖 -->
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <!-- v-on:change 輸入圖片網址 -->
                <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" @change="addUrlImg" ref="urlInput">
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片<i class="fas fa-spinner fa-spin"></i></label>
                <!-- v-on:change 上傳圖片 -->
                <input type="file" id="customFile" class="form-control" @change="uploadFile" ref="fileInput">
              </div>
              <div class="mb-4">
                <!-- v-on 圖片加入多圖陣列 -->
                <button class="btn btn-primary btn-sm d-block w-100" @click="cofirmAdd">
                  <div v-if="cartLoading === 'uploadFile'" class="spinner-border text-info spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>
                  <template v-else>新增圖片</template>
                </button>
              </div>
              <!-- 多圖顯示區 -->
              <div v-if="tempProduct.imagesUrl">
                <div class="mb-3" v-for="(item, i) in tempProduct.imagesUrl" :key="'img'+i">
                  <div class="mb-1 input-group">
                    <input type="url" class="form-control form-control" placeholder="請輸入連結" v-model="tempProduct.imagesUrl[i]">
                    <button type="button" class="btn btn-outline-danger" @click="tempProduct.imagesUrl.splice(i, 1)">移除</button>
                  </div>
                  <div class="w-50"><img class="img-fluid" :src="item" alt=""></div>
                </div>
              </div>
            </div>
            <!-- 右側：商品資訊 -->
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input type="text" class="form-control" id="category" placeholder="請輸入分類" v-model="tempProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input type="text" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempProduct.price">
                </div>
              </div>
              <!-- checkbox 多選 (1)風格 (2)材質 (3)顏色 (4)空間 -->
              <div class="mb-3">
                <label for="styleType" class="form-label d-block">風格</label>
                <div class="form-check form-check-inline" v-for="(item, i) in style" :key="item">
                  <input type="checkbox" class="form-check-input" name="styleType" :id="'styleType'+i" :value="item" v-model="tempProduct.style">
                  <label class="form-check-label" :for="'styleType'+i">{{ item }}</label>
                </div>
              </div>
              <div class="mb-3">
                <label for="materialType" class="form-label d-block">材質</label>
                <div class="form-check form-check-inline" v-for="(item, i) in material" :key="item">
                  <input type="checkbox" class="form-check-input" name="materialType" :id="'materialType'+i" :value="item" v-model="tempProduct.material">
                  <label class="form-check-label" :for="'materialType'+i">{{ item }}</label>
                </div>
              </div>
              <div class="mb-3">
                <label for="colorType" class="form-label d-block">顏色</label>
                <div class="form-check form-check-inline" v-for="(item, i) in colors" :key="item">
                  <input type="checkbox" class="form-check-input" name="colorType" :id="'colorType'+i" :value="item" v-model="tempProduct.colors">
                  <label class="form-check-label" :for="'colorType'+i">{{ item }}</label>
                </div>
              </div>
              <div class="mb-3">
                <label for="spaceType" class="form-label d-block">空間</label>
                <div class="form-check form-check-inline" v-for="(item, i) in space" :key="item">
                  <input type="checkbox" class="form-check-input" name="spaceType" :id="'spaceType'+i" :value="item" v-model="tempProduct.space">
                  <label class="form-check-label" :for="'spaceType'+i">{{ item }}</label>
                </div>
              </div>
              <hr>
              <!-- 選填項目 -->
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" id="is_enabled" v-model="tempProduct.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
                <div class="mb-3 col-md-6">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" id="is_newItem" v-model="tempProduct.is_newItem">
                    <label class="form-check-label" for="is_newItem">新品上架</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
          <!-- emits：將內層 v-model 更新的 tempProduct 傳到外層儲存 -->
          <button type="button" class="btn btn-dark" @click="$emit('update-product', tempProduct)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
import { mapState } from 'pinia'
import statusStore from '@/stores/statusStore'
const status = statusStore()
export default {
  data() {
    return {
      modal: {},
      tempProduct: {
        imageUrl: '',
        imagesUrl: []
      },
      style: ['北歐', '日系簡約', '現代簡約', '工業', '侘寂', '美式鄉村', '輕奢'],
      material: ['布', '皮', '木', '金屬', '塑膠', '藤編', '玻璃', '大理石'],
      colors: ['黑', '白', '米', '灰', '棕', '卡其', '綠', '藍', '橘', '紅'],
      space: ['客廳', '餐廳', '臥室', '書房', '毛孩', '工作空間']
    }
  },
  mixins: [modalMixin],
  props: {
    product: {
      type: Object,
      default() { return {} } // 若不符合 type，回傳預設值(= 空物件)
    }
  },
  emits: ['update-product'],
  watch: {
    product() {
      this.tempProduct = { ...this.product }
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = []
      }
      if (!this.tempProduct.style) {
        this.tempProduct.style = []
      }
      if (!this.tempProduct.material) {
        this.tempProduct.material = []
      }
      if (!this.tempProduct.colors) {
        this.tempProduct.colors = []
      }
      if (!this.tempProduct.space) {
        this.tempProduct.space = []
      }
    }
  },
  computed: {
    ...mapState(statusStore, ['cartLoading'])
  },
  methods: {
    addUrlImg() {
      const inputUrl = this.$refs.urlInput.value
      this.tempProduct.imageUrl = inputUrl
    },
    uploadFile() {
      status.cartLoading = 'uploadFile'
      const uploadedFile = this.$refs.fileInput.files[0] // 上傳的圖
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/upload` // 上傳圖片 api
      this.$http.post(api, formData)
        .then((res) => {
          this.tempProduct.imageUrl = res.data.imageUrl
          status.cartLoading = ''
          status.msgState(res, '圖片上傳')
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    cofirmAdd() {
      this.tempProduct.imagesUrl.push(this.tempProduct.imageUrl)
      this.$refs.urlInput.value = '' // 清空輸入網址欄位
      this.$refs.fileInput.value = '' // 清空選擇檔案欄位
    }
  }
}
</script>
