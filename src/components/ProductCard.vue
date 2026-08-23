<template>
  <div class="pd_card bg-white" @click="goProduct(historyProducts[index]?.id)">
    <!-- <div class="card-img"><img src="../assets/images/about_03.jpg" alt=""></div> -->
    <div class="card-img"><img :src="historyProducts[index]?.imagesUrl[0]" alt=""></div>
    <div class="tt chiron-goround-tc-font">{{ historyProducts[index]?.title }}</div>
    <i class="bi bi-arrow-right-circle-fill text-primary"></i>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBrowseLogStore } from '@/stores/productBrowse'
export default {
  props: {
    productId: {
      type: String,
      required: true
    },
    index: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(useBrowseLogStore, ['historyProducts'])
  },
  methods: {
    ...mapActions(useBrowseLogStore, ['getPDDetail', 'goProduct'])
  },
  created() {
    this.getPDDetail(this.productId)
  }
}
</script>

<style lang="scss" scoped>
.topic {
  .pd_card {
    cursor: pointer;
    position: relative;
    padding: .75em;
    border-radius: 2em;
    transition: all .4s ease;
    &:hover {
      transform: translateY(-6px);
    }
    .card-img {
      border-radius: 1.5em;
      overflow: hidden;
      img {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: center;
      }
    }
    .tt {
      margin-top: .875em;
      margin-bottom: .5em;
      font-weight: 400;
    }
    .bi {
      position: absolute;
      bottom: 2.2em;
      right: .5em;
      font-size: 1.25em;
    }
  }
}
@media screen and (max-width:768px) {
  .topic {
    .pd_card {
      .card-img {
        width: 8.375em;
      }
    }
  }
}
@media screen and (min-width:768px) {
  .topic {
    .pd_card {
      .card-img {
        width: 9.7em;
      }
    }
  }
}
@media screen and (min-width:1200px) {
  .topic {
    .pd_card {
      .card-img {
        width: 8.875em;
      }
    }
  }
}
</style>
