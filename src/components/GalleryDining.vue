<template>
  <!-- 麵包屑 -->
  <nav class="my-3" aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
    <ol class="breadcrumb default">
      <li class="breadcrumb-item"><router-link to="/" class="link-animated">首頁</router-link></li>
      <li class="breadcrumb-item active" aria-current="page">空間靈感</li>
      <li class="breadcrumb-item active" aria-current="page">餐廳</li>
    </ol>
  </nav>
  <!-- 情境推薦 -->
  <div class="topic">
    <div class="box box_dining">
      <div class="pic">
        <!-- <img src="https://images.unsplash.com/photo-1721523234710-63c356134fb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""> -->
        <img src="https://images.unsplash.com/photo-1696814292947-8b6f06af3df2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
        <div class="dot dot_01" @click="goProduct(id1)"></div>
        <div class="dot dot_02" @click="goProduct('-Ox21W9vxaqO_wimbNhm')"></div>
      </div>
      <div class="title roboto-font text-white text-end pe-5"><span class="text-primary">Di</span>ning Room</div>
      <div class="space d-flex flex-column align-items-end">
        <div class="name chiron-goround-tc-font">餐廳</div>
        <div class="caption text-end text-primary pe-3">An inviting dining space<br>to connect with those you love</div>
      </div>
      <div class="Area_PD d-flex justify-content-end">
        <ProductCard :productId="'-Ox52uSd2_6coKsEvg5F'" :index="'0'"></ProductCard>
        <ProductCard :productId="'-Ox5BaSaeK9QP911L_ur'" :index="'1'"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import { mapActions } from 'pinia'
import { useBrowseLogStore } from '@/stores/productBrowse'
export default {
  components: {
    ProductCard
  },
  methods: {
    ...mapActions(useBrowseLogStore, ['goProduct'])
  }
}
</script>

<style lang="scss" scoped>
.topic {
  position: relative;
  margin-bottom: 1.5em;
  .pic {
    position: relative;
    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 0 18em 0 3.5em;
    }
    .dot {
      cursor: pointer;
      width: 1.6em;
      height: 1.6em;
      border: 2px solid rgba(0, 0, 0, 0);
      position: absolute;
      background-color: rgba(255, 255, 255, .75);
      border-radius: 20em;
      transition: all .4s ease-in-out;
      &::after {
        content: "+";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -53%);
        border-radius: 20em;
        font-weight: bold;
        font-family: sans-serif;
      }
      &:hover {
        transform: scale(1.2);
        border: solid 2px #fff;
        background-color: rgba(255, 255, 255, .9);
      }
    }
  }
  .title {
    position: absolute;
    top: 90%;
    transform: rotate(-90deg);
    transform-origin: left center;
  }
  .space {
    position: absolute;
    top: 1.5%;
    right: 1.5%;
    gap: .9em;
    .name {
      font-size: 1.25em;
      width: 4em;
      height: 4em;
      color: var(--bs-primary);
      text-align: center;
      align-content: center;
      border: 1px solid var(--bs-primary);
    }
    ::after {
      content: "";
      position: absolute;
      top: 5.5em;
      right: 0;
      width: 1px;
      background-color: var(--bs-primary);
    }
  }
  .Area_PD {
    position: absolute;
    transform: scale(.98);
    transform-origin: right bottom;
    gap: .75em;
  }
}
// 圓點定位
.box_dining {
  .dot_01 { left: 53.9%; }
  // .dot_02 { left: 36%; }
}
@media screen and (max-width:768px) {
  .topic {
    font-size: 3.75vw;
    .pic {
      img {
        aspect-ratio: 3 / 5;
      }
      .dot {
        font-size: 3.5vw;
      }
    }
    .title {
      left: 1%;
      width: 155%;
      font-size: 5.5em;
      letter-spacing: 0.015em;
    }
    .space {
      top: .5%;
      right: 3%;
      ::after {
        height: 18em;
      }
    }
    .Area_PD {
      bottom: 2%;
      right: 3%;
      transform: scale(.9);
    }
  }
  // 圓點定位
  .box_dining {
    .dot_01 { top: 18vw; left: 32%; }
    .dot_02 { top: 87vw; left: 78%; }
  }
}
@media screen and (min-width:768px) {
  .topic {
    font-size: 18px;
    .pic {
      img {
        aspect-ratio: 4 / 5;
      }
    }
    .title {
      left: 2.2%;
      width: 111%;
      font-size: 7em;
    }
    .space {
      top: .5%;
      right: 3%;
      ::after {
        height: 25em;
      }
    }
    .Area_PD {
      bottom: 2.5%;
      right: 3%;
    }
  }
  // 圓點定位
  .box_dining {
    .dot_01 { top: 92px; }
    .dot_02 { top: 520px; left: 30%; }
  }
}
@media screen and (min-width:1200px) {
  .topic {
    margin-bottom: 3em;
    font-size: 16px;
    .pic {
      img {
        aspect-ratio: 16 / 9;
        border-radius: 0 18em;
      }
    }
    .title {
      top: 92.5%;
      left: 5%;
      width: 56%;
      font-size: 7em;
    }
    .space {
      top: 1.5%;
      right: 1.5%;
      ::after {
        height: 19em;
      }
    }
    .Area_PD {
      bottom: 3.5%;
      right: 1.5%;
    }
  }
  // 圓點定位
  .box_dining {
    .dot_01 { top: 95px; }
    .dot_02 { top: 400px; left: 33%; }
  }
}
</style>
